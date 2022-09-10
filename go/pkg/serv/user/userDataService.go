package user

import (
	"context"

	connect_go "github.com/bufbuild/connect-go"
	v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"
	"github.com/ueckoken/chofu-race-course/go/_proto/spec/v1/v1connect"
)

type Server struct {
	v1connect.UnimplementedUserDataServiceHandler
}

func (s *Server) UserData(
	ctx context.Context,
	req *connect_go.Request[v1.UserDataRequest],
) (*connect_go.Response[v1.UserDataResponse], error) {
	res := &connect_go.Response[v1.UserDataResponse]{Msg: &v1.UserDataResponse{User: &v1.User{}}}
	return res, nil
}
