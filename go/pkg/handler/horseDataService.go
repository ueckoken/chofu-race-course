package handler

import (
	"context"
	"fmt"
	"log"

	"github.com/bufbuild/connect-go"
	connect_go "github.com/bufbuild/connect-go"
	v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"
	"github.com/ueckoken/chofu-race-course/go/_proto/spec/v1/v1connect"
	"github.com/ueckoken/chofu-race-course/go/pkg/authorizer"
	"github.com/ueckoken/chofu-race-course/go/pkg/file"
)

type Horse struct {
	store     DataStore
	adminAuth authorizer.AdminAuthorizer
	v1connect.UnimplementedHorseDataServiceHandler
}

type HorseStore interface {
	Create(h *v1.HorseDetail) error
	GetAll() (*v1.HorseDetails, error)
	GetByID(id uint32) (*v1.HorseDetail, error)
	Update(h *v1.HorseDetail) error
}

func NewHorseServer(store DataStore, adminauth authorizer.AdminAuthorizer) (*Horse, error) {
	return &Horse{store: store, adminAuth: adminauth}, nil
}

func (h *Horse) HorseData(_ context.Context, req *connect_go.Request[v1.HorseDataRequest]) (*connect_go.Response[v1.HorseDataResponse], error) {
	hd, err := h.store.Horse.GetByID(req.Msg.GetId())
	if err != nil {
		switch err.(type) {
		case file.NotFound:
			return nil, connect_go.NewError(connect_go.CodeNotFound, err)
		default:
			return nil, connect_go.NewError(connect_go.CodeInternal, err)
		}
	}
	return connect.NewResponse(&v1.HorseDataResponse{Horse: hd}), nil
}
func (h *Horse) AllHorseData(_ context.Context, req *connect_go.Request[v1.AllHorseDataRequest]) (*connect_go.Response[v1.AllHorseDataResponse], error) {
	records, err := h.store.Horse.GetAll()
	if err != nil {
		return nil, connect_go.NewError(connect_go.CodeInternal, err)
	}
	hs := []*v1.Horse{}
	for _, hd := range records.GetHorseDetails() {
		hs = append(hs, horseDetail2horse(hd))
	}
	return connect.NewResponse(&v1.AllHorseDataResponse{Horses: hs}), nil
}
func (h *Horse) RegisterHorse(_ context.Context, req *connect_go.Request[v1.RegisterHorseRequest]) (*connect_go.Response[v1.RegisterHorseResponse], error) {
	_, ok, err := h.adminAuth.Verify(req.Msg.GetAdminJwt().GetToken())
	if err != nil {
		return nil, connect_go.NewError(connect_go.CodePermissionDenied, err)
	}
	if !ok {
		return nil, connect_go.NewError(connect_go.CodePermissionDenied, fmt.Errorf("invalid jwt, maybe expired"))
	}
	if err := req.Msg.ValidateAll(); err != nil {
		return nil, connect_go.NewError(connect_go.CodeInvalidArgument, err)
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
	if err := h.store.Horse.Create(&hd); err != nil {
		return nil, connect_go.NewError(connect_go.CodeInternal, err)
	}
	log.Printf("add horse successful, %+v", &hd)
	return connect.NewResponse(&v1.RegisterHorseResponse{}), nil
}

func (h *Horse) EditHorse(_ context.Context, req *connect_go.Request[v1.EditHorseRequest]) (*connect_go.Response[v1.EditHorseResponse], error) {
	_, ok, err := h.adminAuth.Verify(req.Msg.GetAdminJwt().GetToken())
	if err != nil {
		return nil, connect_go.NewError(connect_go.CodePermissionDenied, err)
	}
	if !ok {
		return nil, connect_go.NewError(connect_go.CodePermissionDenied, fmt.Errorf("invalid jwt, maybe expired"))
	}
	if err := req.Msg.ValidateAll(); err != nil {
		return nil, connect_go.NewError(connect_go.CodeInvalidArgument, err)
	}
	hd, err := h.store.Horse.GetByID(req.Msg.GetId())
	if err != nil {
		return nil, connect_go.NewError(connect_go.CodeInternal, err)
	}
	if req.Msg.GetName() != "" {
		hd.Data.Name = req.Msg.GetName()
	}
	if req.Msg.GetOwner() != "" {
		hd.Owner = req.Msg.GetOwner()
	}
	if req.Msg.GetImage() != nil {
		hd.Image = req.Msg.GetImage()
	}
	if err := h.store.Horse.Update(hd); err != nil {
		return nil, connect_go.NewError(connect_go.CodeInternal, err)
	}
	return connect_go.NewResponse(&v1.EditHorseResponse{}), nil
}
func horseDetail2horse(hd *v1.HorseDetail) *v1.Horse {
	return &v1.Horse{Id: hd.Data.GetId(), Name: hd.Data.GetName()}
}
