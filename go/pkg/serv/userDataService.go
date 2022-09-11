package serv

import (
	"context"

	"github.com/ueckoken/chofu-race-course/go/pkg/storage"
	"github.com/ueckoken/chofu-race-course/go/pkg/store"

	connectGo "github.com/bufbuild/connect-go"
	v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"
	"github.com/ueckoken/chofu-race-course/go/_proto/spec/v1/v1connect"
)

type Server struct {
	v1connect.UnimplementedUserDataServiceHandler
	store store.User
}

func NewServer(store store.User) (*Server, error) {
	w, err := storage.NewWriter("hoge")
	if err != nil {
		return nil, err
	}
	return &Server{store: w}, nil
}

func (s *Server) UserData(
	ctx context.Context,
	req *connectGo.Request[v1.UserDataRequest],
) (*connectGo.Response[v1.UserDataResponse], error) {
	user, err := store.User.GetById(req.Msg.UserId)
	if err != nil {
		return nil, err
	}
	return &connectGo.Response[v1.UserDataResponse]{Msg: &v1.UserDataResponse{User: user}}, nil
}
