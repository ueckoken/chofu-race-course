package handler

import (
	"context"
	"fmt"
	"log"

	"github.com/ueckoken/chofu-race-course/go/pkg/file"

	connectGo "github.com/bufbuild/connect-go"
	v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"
	"github.com/ueckoken/chofu-race-course/go/_proto/spec/v1/v1connect"
	"github.com/ueckoken/chofu-race-course/go/pkg/authorizer"
)

type User struct {
	v1connect.UnimplementedUserDataServiceHandler
	store UserStore
	auth  authorizer.JWTIssuer
}

type UserStore interface {
	GetById(id string) (*v1.User, error)
	Create(u *v1.User) error
}

func NewUserServer(store UserStore, issuer authorizer.JWTIssuer) (*User, error) {
	w, err := file.NewUserFile("hoge")
	if err != nil {
		return nil, err
	}
	return &User{store: w, auth: issuer}, nil
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
	err := u.store.Create(req.Msg.User)
	if err != nil {
		return nil, connectGo.NewError(connectGo.CodeInvalidArgument, err)
	}
	return &connectGo.Response[v1.CreateUserResponse]{Msg: &v1.CreateUserResponse{}}, nil
}
