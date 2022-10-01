package handler

import (
	"context"
	"fmt"

	connect_go "github.com/bufbuild/connect-go"
	v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"
	"github.com/ueckoken/chofu-race-course/go/_proto/spec/v1/v1connect"
	"github.com/ueckoken/chofu-race-course/go/pkg/file"
)

type Horse struct {
	v1connect.UnimplementedHorseDataServiceHandler
	store HorseStore
}

type HorseStore interface {
	Create(h *v1.HorseDetail) error
	GetAll() ([]*v1.HorseDetail, error)
	GetById(id uint32) (*v1.HorseDetail, error)
}

func NewHorseServer(store HorseStore) (*Horse, error) {
	return &Horse{store: store}, nil
}

func (h *Horse) HorseData(_ context.Context, req *connect_go.Request[v1.HorseDataRequest]) (*connect_go.Response[v1.HorseDataResponse], error) {
	hd, err := h.store.GetById(req.Msg.GetId())
	if err != nil {
		switch err.(type) {
		case file.NotFound:
			return nil, connect_go.NewError(connect_go.CodeNotFound, err)
		default:
			return nil, connect_go.NewError(connect_go.CodeInternal, err)
		}
	}
	return &connect_go.Response[v1.HorseDataResponse]{Msg: &v1.HorseDataResponse{Horse: hd}}, nil
}
func (h *Horse) AllHorseData(_ context.Context, req *connect_go.Request[v1.AllHorseDataRequest]) (*connect_go.Response[v1.AllHorseDataResponse], error) {
	records, err := h.store.GetAll()
	if err != nil {
		return nil, connect_go.NewError(connect_go.CodeInternal, err)
	}
	hs := []*v1.Horse{}
	for _, hd := range records {
		hs = append(hs, horseDetail2horse(hd))
	}
	return &connect_go.Response[v1.AllHorseDataResponse]{Msg: &v1.AllHorseDataResponse{Horses: hs}}, nil
}
func (h *Horse) RegisterHorse(_ context.Context, req *connect_go.Request[v1.RegisterHorseRequest]) (*connect_go.Response[v1.RegisterHorseResponse], error) {
	if req.Msg.GetOwner() == "" {
		return nil, connect_go.NewError(connect_go.CodeInvalidArgument, fmt.Errorf("you must fill Owner field with not default value"))
	}
	if req.Msg.GetName() == "" {
		return nil, connect_go.NewError(connect_go.CodeInvalidArgument, fmt.Errorf("you must fill Name field with not default value"))
	}
	hd := v1.HorseDetail{
		Data: &v1.Horse{
			Id:   0,
			Name: req.Msg.GetName(),
		},
		Owner:     req.Msg.GetOwner(),
		Image:     nil,
		Wins:      0,
		Matches:   0,
		Next:      nil,
		Histories: []*v1.HorseDetail_History{},
	}
	if err := h.store.Create(&hd); err != nil {
		return nil, connect_go.NewError(connect_go.CodeInternal, err)
	}
	return &connect_go.Response[v1.RegisterHorseResponse]{Msg: &v1.RegisterHorseResponse{}}, nil
}

func horseDetail2horse(hd *v1.HorseDetail) *v1.Horse {
	return &v1.Horse{Id: hd.Data.GetId(), Name: hd.Data.GetName()}
}