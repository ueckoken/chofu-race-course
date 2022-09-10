package horse

import (
	"context"

	connect_go "github.com/bufbuild/connect-go"
	v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"
	"github.com/ueckoken/chofu-race-course/go/_proto/spec/v1/v1connect"
)

type Server struct {
	v1connect.UnimplementedHorseDataServiceHandler
}

func (s *Server) HorseData(
	ctx context.Context,
	req *connect_go.Request[v1.HorseDataRequest],
) (*connect_go.Response[v1.HorseDataResponse], error) {
	return nil, nil
}
func (s *Server) AllHorseData(
	ctx context.Context,
	req *connect_go.Request[v1.AllHorseDataRequest],
) (*connect_go.Response[v1.AllHorseDataResponse], error) {
	return nil, nil
}
