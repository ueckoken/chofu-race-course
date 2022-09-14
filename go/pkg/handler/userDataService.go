package handler

import (
	"context"

	"github.com/ueckoken/chofu-race-course/go/pkg/file"
	"github.com/ueckoken/chofu-race-course/go/pkg/store"

	connectGo "github.com/bufbuild/connect-go"
	v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"
	"github.com/ueckoken/chofu-race-course/go/_proto/spec/v1/v1connect"
)

type User struct {
	v1connect.UnimplementedUserDataServiceHandler
	store store.User
}

func NewUserServer(store store.User) (*User, error) {
	// ここでNewWriter作るのは何となく違う気がする。多分NewWriterを中で呼ぶNewUserModelみたいなのを置くべき
	// そいつにCreateUserとかさせましょう
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

func (s *User) CreateUser(ctx context.Context, req *connectGo.Request[v1.CreateUserRequest]) (*connectGo.Response[v1.CreateUserResponse], error) {
	err := s.store.Create(req.Msg.User)
	if err != nil {
		return nil, connectGo.NewError(connectGo.CodeInvalidArgument, err)
	}
	return &connectGo.Response[v1.CreateUserResponse]{Msg: &v1.CreateUserResponse{}}, nil
}
