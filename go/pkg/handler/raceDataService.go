package handler

import (
	"context"
	"fmt"
	"time"

	connect_go "github.com/bufbuild/connect-go"
	v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"
	"github.com/ueckoken/chofu-race-course/go/pkg/authorizer"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type Race struct {
	store     RaceStore
	adminAuth authorizer.AdminAuthorizer
}

type RaceStore interface {
	GetRange(from, to time.Time) ([]*v1.RaceDetail, error)
	GetById(id uint32) (*v1.RaceDetail, error)
	Create(*v1.RaceDetail) error
}

func NewRaceServer(store RaceStore, adminauth authorizer.AdminAuthorizer) (*Race, error) {
	return &Race{store: store, adminAuth: adminauth}, nil
}

func (r *Race) RangeRaceData(_ context.Context, req *connect_go.Request[v1.RangeRaceDataRequest]) (*connect_go.Response[v1.RangeRaceDataResponse], error) {
	from := func(t *timestamppb.Timestamp) time.Time {
		if t == nil {
			return time.Date(0, 0, 0, 0, 0, 0, 0, time.UTC)
		}
		return t.AsTime()
	}(req.Msg.GetBegin())
	to := func(t *timestamppb.Timestamp) time.Time {
		if t == nil {
			return time.Now().UTC()
		}
		return t.AsTime()
	}(req.Msg.GetEnd())
	races, err := r.store.GetRange(from, to)
	if err != nil {
		return nil, connect_go.NewError(connect_go.CodeInternal, err)
	}
	return &connect_go.Response[v1.RangeRaceDataResponse]{Msg: &v1.RangeRaceDataResponse{Races: raceDetails2Races(races)}}, nil
}
func (r *Race) RaceData(_ context.Context, req *connect_go.Request[v1.RaceDataRequest]) (*connect_go.Response[v1.RaceDataResponse], error) {
	rd, err := r.store.GetById(req.Msg.GetId())
	if err != nil {
		return nil, connect_go.NewError(connect_go.CodeInternal, err)
	}
	return &connect_go.Response[v1.RaceDataResponse]{Msg: &v1.RaceDataResponse{Race: rd}}, nil
}
func (r *Race) RegisterRace(_ context.Context, req *connect_go.Request[v1.RegisterRaceRequest]) (*connect_go.Response[v1.RegisterRaceResponse], error) {
	_, ok, err := r.adminAuth.Verify(req.Msg.GetAdminJwt().GetToken())
	if err != nil {
		return nil, connect_go.NewError(connect_go.CodePermissionDenied, err)
	}
	if !ok {
		return nil, connect_go.NewError(connect_go.CodePermissionDenied, fmt.Errorf("invalid jwt, maybe expired"))
	}
	rd := &v1.RaceDetail{
		Data: &v1.Race{
			// TODO: IDをオートインクリメントする仕組みをStoreに実装する
			Id:         0,
			Name:       req.Msg.GetName(),
			Order:      req.Msg.GetOrder(),
			Start:      req.Msg.GetStart(),
			IsFinished: false,
		},
		Description: req.Msg.GetDescription(),
		Members:     []*v1.RaceDetail_Member{},
		//  vote_begin: start - n, vote_end: start - m
		// TODO; implement me
		VoteBegin: nil,
		VoteEnd:   nil,
	}
	// TODO; userDetailのバリデータを挟む （Storeに実装したほうがいいのかな？）
	err = r.store.Create(rd)
	if err != nil {
		return nil, connect_go.NewError(connect_go.CodeInternal, err)
	}
	return &connect_go.Response[v1.RegisterRaceResponse]{Msg: &v1.RegisterRaceResponse{}}, nil
}

func raceDetails2Races(rds []*v1.RaceDetail) []*v1.Race {
	rs := []*v1.Race{}
	for _, rd := range rds {
		rs = append(rs, &v1.Race{
			Id:         rd.GetData().GetId(),
			Name:       rd.GetData().GetName(),
			Order:      rd.GetData().GetOrder(),
			Start:      rd.GetData().GetStart(),
			IsFinished: rd.GetData().GetIsFinished(),
		})
	}
	return rs
}
