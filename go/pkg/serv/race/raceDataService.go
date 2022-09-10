package race

import (
	"context"

	"github.com/bufbuild/connect-go"
	v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"
	"github.com/ueckoken/chofu-race-course/go/_proto/spec/v1/v1connect"
)

type Server struct {
	v1connect.UnimplementedRaceDataServiceHandler
}

func (s *Server) RaceData(
	ctx context.Context,
	req *connect.Request[v1.RaceDataRequest],
) (*connect.Response[v1.RaceDataResponse], error) {
	return nil, nil
}

func (s *Server) RangeRaceData(
	ctx context.Context,
	req *connect.Request[v1.RangeRaceDataRequest],
) (*connect.Response[v1.RangeRaceDataResponse], error) {
	return nil, nil
}
