package handler

import (
	"context"
	"crypto/rand"
	"fmt"
	"log"

	connectGo "github.com/bufbuild/connect-go"
	v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"
	"github.com/ueckoken/chofu-race-course/go/_proto/spec/v1/v1connect"
	"github.com/ueckoken/chofu-race-course/go/pkg/authorizer"
)

type User struct {
	v1connect.UnimplementedUserDataServiceHandler
	store     UserStore
	auth      authorizer.JWTIssuer
	adminauth authorizer.AdminAuthorizer
}

type UserStore interface {
	GetById(id string) (*v1.User, error)
	Create(u *v1.User) error
}

func NewUserServer(store UserStore, issuer authorizer.JWTIssuer, adminauth authorizer.AdminAuthorizer) (*User, error) {
	return &User{store: store, auth: issuer, adminauth: adminauth}, nil
}

func (s *User) UserData(ctx context.Context, req *connectGo.Request[v1.UserDataRequest]) (*connectGo.Response[v1.UserDataResponse], error) {
	u, ok, err := s.auth.Verify(req.Msg.GetJwt().GetToken())
	if err != nil {
		log.Printf("auth verify returned error, err=%s\n", err)
		return nil, connectGo.NewError(connectGo.CodeUnauthenticated, fmt.Errorf("failed to verify jwt key, maybe invalid"))
	}
	if !ok {
		log.Printf("auth returned not ok, err=%s\n", err)
		return nil, connectGo.NewError(connectGo.CodeUnauthenticated, fmt.Errorf("failed to authorize, maybe expired?"))
	}
	user, err := s.store.GetById(u)
	if err != nil {
		return nil, connectGo.NewError(connectGo.CodeNotFound, err)
	}
	return &connectGo.Response[v1.UserDataResponse]{Msg: &v1.UserDataResponse{User: user}}, nil
}

func (u *User) CreateUser(ctx context.Context, req *connectGo.Request[v1.CreateUserRequest]) (*connectGo.Response[v1.CreateUserResponse], error) {
	buf := make([]byte, 8)
	if _, err := rand.Read(buf); err != nil {
		log.Printf("failed to generate random userid, err=%s\n", err)
		return nil, fmt.Errorf("username generation error")
	}
	uid := &v1.User{Id: fmt.Sprintf("%x", buf)}
	err := u.store.Create(uid)
	if err != nil {
		return nil, connectGo.NewError(connectGo.CodeInvalidArgument, err)
	}
	j, err := u.auth.Sign(uid.GetId())
	if err != nil {
		return nil, connectGo.NewError(connectGo.CodeInvalidArgument, err)
	}
	return &connectGo.Response[v1.CreateUserResponse]{Msg: &v1.CreateUserResponse{User: uid, Jwt: &v1.JWT{Token: j}}}, nil
}

func (c *User) LoginAsAdmin(ctx context.Context, req *connectGo.Request[v1.LoginAsAdminRequest]) (*connectGo.Response[v1.LoginAsAdminResponse], error) {
	ok := c.adminauth.VerifyPassword(req.Msg.Password)
	if !ok {
		return nil, connectGo.NewError(connectGo.CodePermissionDenied, fmt.Errorf("failed to verify password"))
	}
	buf := make([]byte, 8)
	if _, err := rand.Read(buf); err != nil {
		log.Printf("failed to generate random admin userid, err=%s\n", err)
		return nil, fmt.Errorf("username generation error")
	}
	j, err := c.adminauth.Sign(fmt.Sprintf("%x", buf))
	if err != nil {
		return nil, connectGo.NewError(connectGo.CodeAborted, fmt.Errorf("failed to generate jwt"))
	}
	return &connectGo.Response[v1.LoginAsAdminResponse]{Msg: &v1.LoginAsAdminResponse{AdminJwt: &v1.JWT{Token: j}}}, nil
}
