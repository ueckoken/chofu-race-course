package handler

import (
	"context"

	"github.com/ueckoken/chofu-race-course/go/pkg/storage"
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
	w, err := storage.NewWriter("hoge")
	if err != nil {
		return nil, err
	}
	return &User{store: w}, nil
}

func (s *User) UserData(
	ctx context.Context,
	req *connectGo.Request[v1.UserDataRequest],
) (*connectGo.Response[v1.UserDataResponse], error) {
	user, err := s.store.GetById(req.Msg.UserId)
	if err != nil {
		return nil, err
	}
	return &connectGo.Response[v1.UserDataResponse]{Msg: &v1.UserDataResponse{User: user}}, nil
}
