package handler

import (
	"context"

	"github.com/ueckoken/chofu-race-course/go/pkg/file"

	connectGo "github.com/bufbuild/connect-go"
	v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"
	"github.com/ueckoken/chofu-race-course/go/_proto/spec/v1/v1connect"
)

type User struct {
	v1connect.UnimplementedUserDataServiceHandler
	store UserStore
}

type UserStore interface {
	GetById(id string) (*v1.User, error)
	Create(u *v1.User) error
}

func NewUserServer(store UserStore) (*User, error) {
	w, err := file.NewUserFile("hoge")
	if err != nil {
		return nil, err
	}
	return &User{store: w}, nil
}

func (s *User) UserData(
	ctx context.Context,
	req *connectGo.Request[v1.UserDataRequest],
) (*connectGo.Response[v1.UserDataResponse], error) {
	user, err := s.store.GetById(req.Msg.GetId())
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
