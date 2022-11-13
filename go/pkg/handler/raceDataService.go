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
	if len(req.Msg.GetMembers()) == 0 {
		return nil, connect_go.NewError(connect_go.CodeInvalidArgument, fmt.Errorf("members array length 0 is nil"))
	}
	raceRec, err := r.store.Race.GetByID(req.Msg.GetId())
	if err != nil {
		return nil, connect_go.NewError(connect_go.CodeInternal, err)
	}
	raceRec.Members = req.Msg.GetMembers()
	if err := r.store.Race.Update(raceRec); err != nil {
		return nil, connect_go.NewError(connect_go.CodeInternal, err)
	}
	// TODO; ここに既j存レコードが存在するかの判定を移動する
	hds := make([]*v1.HorseDetail, len(req.Msg.GetMembers()))
	for i, horse := range req.Msg.GetMembers() {
		hd, err := r.getRegisteredHorseDetail(horse, raceRec)
		if err != nil {
			return nil, connect_go.NewError(connect_go.CodeInternal, fmt.Errorf("updateHorseDetail failed, no update executed in all members, id=`%d`, %w", i, err))
		}
		hds[i] = hd
	}

	for _, hd := range hds {
		if err := r.store.Horse.Update(hd); err != nil {
			return nil, connect_go.NewError(connect_go.CodeInternal, fmt.Errorf("horse update failed, %w", err))
		}
	}
	return connect_go.NewResponse(&v1.RegisterRaceResultResponse{}), nil
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
		ms, err := r.fetchMembers(req.Msg.GetMembers())
		if err != nil {
			return nil, err
		}
		oldRec.Members = ms
	}

	if err := r.store.Race.Update(oldRec); err != nil {
		return nil, connect_go.NewError(connect_go.CodeInternal, err)
	}
	return connect_go.NewResponse(&v1.EditRaceResponse{}), nil
}

func (r *Race) DeleteRaceResult(ctx context.Context, req *connect_go.Request[v1.DeleteRaceResultRequest]) (*connect_go.Response[v1.DeleteRaceResultResponse], error) {
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
	if len(req.Msg.GetHorseAndEffects()) == 0 {
		return nil, connect_go.NewError(connect_go.CodeInvalidArgument, fmt.Errorf("members array length 0 is invalid"))
	}
	raceRec, err := r.store.Race.GetByID(req.Msg.GetId())
	if err != nil {
		return nil, connect_go.NewError(connect_go.CodeInternal, err)
	}
	raceRec.Members = nil
	if err := r.store.Race.Update(raceRec); err != nil {
		return nil, connect_go.NewError(connect_go.CodeInternal, err)
	}
	// TODO; ここに既存レコードが存在するかの判定を移動する
	hds := make([]*v1.HorseDetail, len(req.Msg.GetHorseAndEffects()))
	for i, horse := range req.Msg.GetHorseAndEffects() {
		hd, err := r.getDeletedHorseDetail(horse, raceRec)
		if err != nil {
			return nil, connect_go.NewError(connect_go.CodeInternal, fmt.Errorf("updateHorseDetail failed, no update executed in all members, id=`%d`, %w", i, err))
		}
		hds[i] = hd
	}

	for _, hd := range hds {
		if err := r.store.Horse.Update(hd); err != nil {
			return nil, connect_go.NewError(connect_go.CodeInternal, fmt.Errorf("horse update failed, %w", err))
		}
	}
	return connect_go.NewResponse(&v1.DeleteRaceResultResponse{}), nil
}

func (r *Race) fetchMembers(horseIDs []uint32) ([]*v1.RaceDetail_Member, error) {
	res := make([]*v1.RaceDetail_Member, len(horseIDs))
	for i, horseID := range horseIDs {
		h, err := r.store.Horse.GetByID(horseID)
		if err != nil {
			return nil, err
		}
		res[i] = &v1.RaceDetail_Member{Horse: horseDetail2horse(h)}
	}
	return res, nil
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

func raceDetail2Race(rd *v1.RaceDetail) *v1.Race {
	return &v1.Race{
		Id:         rd.GetData().GetId(),
		Name:       rd.GetData().GetName(),
		Order:      rd.GetData().GetOrder(),
		Start:      rd.GetData().GetStart(),
		IsFinished: rd.GetData().GetIsFinished(),
	}
}
func raceDetails2Races(rds []*v1.RaceDetail) []*v1.Race {
	rs := make([]*v1.Race, len(rds))
	for i, rd := range rds {
		rs[i] = raceDetail2Race(rd)
	}
	return rs
}

func (r *Race) getRegisteredHorseDetail(horse *v1.RaceDetail_Member, rd *v1.RaceDetail) (*v1.HorseDetail, error) {
	if horse == nil {
		return nil, connect_go.NewError(connect_go.CodeInvalidArgument, errors.New("not arrow nil"))
	}
	if rd == nil {
		return nil, connect_go.NewError(connect_go.CodeInvalidArgument, errors.New("not arrow nil"))
	}
	hd, err := r.store.Horse.GetByID(horse.GetHorse().GetId())
	if err != nil {
		return nil, connect_go.NewError(connect_go.CodeInternal, err)
	}
	for _, history := range hd.GetHistories() {
		if history.GetRace().GetId() == rd.GetData().GetId() {
			return nil, connect_go.NewError(connect_go.CodeInvalidArgument, fmt.Errorf("same race id record is existed, id=%d", rd.GetData().GetId()))
		}
	}
	switch o := horse.GetOrder().GetOrderOneof().(type) {
	case *v1.RaceOrder_Order:
		if o.Order == 1 {
			hd.Wins++
		}
		if 1 <= o.Order && o.Order <= 4 {
			hd.Matches++
		}
	case *v1.RaceOrder_Note:
		if o.Note == v1.RaceOrder_NOTE_TYPE_GIVEUP {
			hd.Matches++
		}
	default:
		// orderがnilのとき
		return nil, connect_go.NewError(connect_go.CodeAlreadyExists, errors.New(hd.String()))
	}
	hd.Histories = append(hd.Histories, &v1.HorseDetail_History{
		Race: raceDetail2Race(rd),
		// このOrderはレースが第nレースかを表現
		Order:  rd.GetData().GetOrder(),
		Result: horse.GetOrder(),
	})
	return hd, nil
}
func (r *Race) getDeletedHorseDetail(horseAndEffect *v1.DeleteRaceResultRequest_HorseAndEffect, rd *v1.RaceDetail) (*v1.HorseDetail, error) {
	if horseAndEffect == nil {
		return nil, connect_go.NewError(connect_go.CodeInvalidArgument, errors.New("not arrow nil"))
	}
	if rd == nil {
		return nil, connect_go.NewError(connect_go.CodeInvalidArgument, errors.New("not arrow nil"))
	}
	hd, err := r.store.Horse.GetByID(horseAndEffect.GetMember().GetHorse().GetId())
	if err != nil {
		return nil, connect_go.NewError(connect_go.CodeInternal, err)
	}
	if horseAndEffect.GetMatch() {
		hd.Matches--
	}
	if horseAndEffect.GetWin() {
		hd.Wins--
	}
	if len(hd.GetHistories()) > 0 {
		hd.Histories[len(hd.GetHistories())-1] = nil
		if len(hd.GetHistories())-2 >= 0 {
			hd.Histories = hd.Histories[:len(hd.GetHistories())-2]
		}
	}
	return hd, nil
}
