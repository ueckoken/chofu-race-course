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
	GetById(id uint32) (*v1.HorseDetail, error)
}

func NewHorseServer(store HorseStore) (*Horse, error) {
	//TODO horseFileのパスをどこかから挿入できるようにする
	w, err := file.NewHorseFile("horse")
	if err != nil {
		return nil, err
	}
	return &Horse{store: w}, nil
}

func (h *Horse) HorseData(ctx context.Context, req *connect_go.Request[v1.HorseDataRequest]) (*connect_go.Response[v1.HorseDataResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, nil)
}
func (h *Horse) AllHorseData(ctx context.Context, req *connect_go.Request[v1.AllHorseDataRequest]) (*connect_go.Response[v1.AllHorseDataResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, nil)
}
func (h *Horse) RegisterHorse(ctx context.Context, req *connect_go.Request[v1.RegisterHorseRequest]) (*connect_go.Response[v1.RegisterHorseResponse], error) {
	if req.Msg.GetOwner() == "" {
		return nil, connect_go.NewError(connect_go.CodeInvalidArgument, fmt.Errorf("you must fill Owner field with not default value"))
	}
	if req.Msg.GetName() == "" {
		return nil, connect_go.NewError(connect_go.CodeInvalidArgument, fmt.Errorf("you must fill Name field with not default value"))
	}
	// TODO: IDのオートインクリメントについて考える
	var id uint32 = 1
	hd := v1.HorseDetail{
		Data: &v1.Horse{
			Id:   id,
			Name: req.Msg.GetName(),
		},
		Owner:     req.Msg.GetOwner(),
		Image:     nil,
		Wins:      0,
		Matches:   0,
		Next:      nil,
		Histories: nil,
	}
	if err := h.store.Create(&hd); err != nil {
		return nil, connect_go.NewError(connect_go.CodeInternal, err)
	}
	return &connect_go.Response[v1.RegisterHorseResponse]{Msg: &v1.RegisterHorseResponse{}}, nil
}
