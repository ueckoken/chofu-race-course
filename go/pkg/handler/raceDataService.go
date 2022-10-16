package handler

import (
	"context"
	"errors"
	"fmt"

	connect_go "github.com/bufbuild/connect-go"
	v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"
	"github.com/ueckoken/chofu-race-course/go/_proto/spec/v1/v1connect"

	"github.com/ueckoken/chofu-race-course/go/pkg/authorizer"
)

type Race struct {
	store     DataStore
	adminAuth authorizer.AdminAuthorizer
	v1connect.UnimplementedRaceDataServiceHandler
}

type RaceStore interface {
	GetAll() (*v1.RaceDetails, error)
	GetByID(id uint32) (*v1.RaceDetail, error)
	Create(*v1.RaceDetail) error
	Update(*v1.RaceDetail) error
}

func NewRaceServer(store DataStore, adminauth authorizer.AdminAuthorizer) (*Race, error) {
	return &Race{store: store, adminAuth: adminauth}, nil
}

func (r *Race) AllRaceData(_ context.Context, req *connect_go.Request[v1.AllRaceDataRequest]) (*connect_go.Response[v1.AllRaceDataResponse], error) {
	if err := req.Msg.ValidateAll(); err != nil {
		return nil, connect_go.NewError(connect_go.CodeInvalidArgument, err)
	}
	rds, err := r.store.Race.GetAll()
	if err != nil {
		return nil, connect_go.NewError(connect_go.CodeInternal, err)
	}
	return connect_go.NewResponse(&v1.AllRaceDataResponse{Races: raceDetails2Races(rds.GetRaceDetails())}), nil
}

func (r *Race) RaceData(_ context.Context, req *connect_go.Request[v1.RaceDataRequest]) (*connect_go.Response[v1.RaceDataResponse], error) {
	if err := req.Msg.ValidateAll(); err != nil {
		return nil, connect_go.NewError(connect_go.CodeInvalidArgument, err)
	}
	rd, err := r.store.Race.GetByID(req.Msg.GetId())
	if err != nil {
		return nil, connect_go.NewError(connect_go.CodeInternal, err)
	}
	return connect_go.NewResponse(&v1.RaceDataResponse{Race: rd}), nil
}

func (r *Race) RegisterRace(_ context.Context, req *connect_go.Request[v1.RegisterRaceRequest]) (*connect_go.Response[v1.RegisterRaceResponse], error) {
	_, ok, err := r.adminAuth.Verify(req.Msg.GetAdminJwt().GetToken())
	if err != nil {
		return nil, connect_go.NewError(connect_go.CodePermissionDenied, err)
	}
	if !ok {
		return nil, connect_go.NewError(connect_go.CodePermissionDenied, fmt.Errorf("invalid jwt, maybe expired"))
	}
	if err := req.Msg.ValidateAll(); err != nil {
		return nil, connect_go.NewError(connect_go.CodeInvalidArgument, err)
	}
	rd := &v1.RaceDetail{
		Data: &v1.Race{
			Id:         0,
			Name:       req.Msg.GetName(),
			Order:      req.Msg.GetOrder(),
			Start:      req.Msg.GetStart(),
			IsFinished: false,
		},
		Description: req.Msg.GetDescription(),
		Members:     []*v1.RaceDetail_Member{},
		// TODO; vote_begin, vote_endは仮実装のためにstartと同じ値を入れている(#106)
		VoteBegin: req.Msg.GetStart(),
		VoteEnd:   req.Msg.GetStart(),
	}
	if err := r.store.Race.Create(rd); err != nil {
		return nil, connect_go.NewError(connect_go.CodeInternal, err)
	}
	return connect_go.NewResponse(&v1.RegisterRaceResponse{}), nil
}

func (r *Race) RegisterRaceResult(ctx context.Context, req *connect_go.Request[v1.RegisterRaceResultRequest]) (*connect_go.Response[v1.RegisterRaceResultResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("spec.v1.RaceDataService.RegisterRaceResult is not implemented"))
}

func (r *Race) EditRace(ctx context.Context, req *connect_go.Request[v1.EditRaceRequest]) (*connect_go.Response[v1.EditRaceResponse], error) {
	_, ok, err := r.adminAuth.Verify(req.Msg.GetAdminJwt().GetToken())
	if err != nil {
		return nil, connect_go.NewError(connect_go.CodePermissionDenied, err)
	}
	if !ok {
		return nil, connect_go.NewError(connect_go.CodePermissionDenied, fmt.Errorf("invalid jwt, maybe expired"))
	}
	if err := req.Msg.ValidateAll(); err != nil {
		return nil, connect_go.NewError(connect_go.CodeInvalidArgument, err)
	}
	oldRec, err := r.store.Race.GetByID(req.Msg.GetId())
	if err != nil {
		return nil, connect_go.NewError(connect_go.CodeInternal, err)
	}

	editFields := findFieldsToEdit(req.Msg)
	if editFields&EditRaceRequestName != 0 {
		oldRec.Data.Name = req.Msg.GetName()
	}
	if editFields&EditRaceRequestOrder != 0 {
		oldRec.Data.Order = req.Msg.GetOrder()
	}
	if editFields&EditRaceRequestStart != 0 {
		oldRec.Data.Start = req.Msg.GetStart()
	}
	if editFields&EditRaceRequestDescription != 0 {
		oldRec.Description = req.Msg.GetDescription()
	}
	if editFields&EditRaceRequestMembers != 0 {
		oldRec.Members = req.Msg.GetMembers()
	}

	if err := r.store.Race.Update(oldRec); err != nil {
		return nil, connect_go.NewError(connect_go.CodeInternal, err)
	}
	return connect_go.NewResponse(&v1.EditRaceResponse{}), nil
}

type EditRaceRequestField int

const (
	EditRaceRequestName        EditRaceRequestField = 1 << iota
	EditRaceRequestOrder       EditRaceRequestField = 1 << iota
	EditRaceRequestStart       EditRaceRequestField = 1 << iota
	EditRaceRequestDescription EditRaceRequestField = 1 << iota
	EditRaceRequestMembers     EditRaceRequestField = 1 << iota
)

func findFieldsToEdit(req *v1.EditRaceRequest) EditRaceRequestField {
	var res EditRaceRequestField
	if req.GetName() != "" {
		res |= EditRaceRequestName
	}
	if req.GetOrder() != 0 {
		res |= EditRaceRequestOrder
	}
	if req.GetStart() != nil {
		res |= EditRaceRequestStart
	}
	if req.GetDescription() != "" {
		res |= EditRaceRequestDescription
	}
	if len(req.Members) != 0 {
		res |= EditRaceRequestMembers
	}
	return res
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
