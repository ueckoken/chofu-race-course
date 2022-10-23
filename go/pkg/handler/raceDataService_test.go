package handler_test

import (
	"context"
	"testing"

	"github.com/bufbuild/connect-go"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"
	"github.com/ueckoken/chofu-race-course/go/pkg/authorizer"
	"github.com/ueckoken/chofu-race-course/go/pkg/handler"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type horseStoreMock struct {
	mock.Mock
	handler.HorseStore
}

func (h *horseStoreMock) GetByID(id uint32) (*v1.HorseDetail, error) {
	return &v1.HorseDetail{
		Data: &v1.Horse{
			Id:   id,
			Name: "アアア",
		},
		Owner:     "アーア",
		Image:     &v1.HorseDetail_Image{},
		Wins:      0,
		Matches:   0,
		Histories: []*v1.HorseDetail_History{},
	}, nil
}

type raceStoreMock struct {
	handler.RaceStore
	mock.Mock
}

// func (r *raceStoreMock) Update(req *v1.RaceDetail) error { return req.ValidateAll() }

// func (r *raceStoreMock) GetAll() (*v1.RaceDetails, error) { return nil, nil }

func (r *raceStoreMock) GetByID(id uint32) (*v1.RaceDetail, error) {
	rd := &v1.RaceDetail{
		Data:      &v1.Race{Id: id, Name: "ホゲ", Order: 1, Start: &timestamppb.Timestamp{}, IsFinished: false},
		VoteBegin: &timestamppb.Timestamp{},
		VoteEnd:   &timestamppb.Timestamp{},
	}
	return rd, nil
}
func (r *raceStoreMock) Create(req *v1.RaceDetail) error { return req.ValidateAll() }
func (r *raceStoreMock) Update(req *v1.RaceDetail) error { return req.ValidateAll() }

type auth struct {
	authorizer.AdminAuthorizer
	mock.Mock
}

func (a *auth) Verify(j string) (username string, ok bool, err error) {
	args := a.Called(j)
	return args.String(0), args.Bool(1), args.Error(2)
}

func TestEditRace(t *testing.T) {
	a := &auth{}
	a.On("Verify", "token").Return("ok", true, nil)
	store := handler.DataStore{Race: &raceStoreMock{}, Horse: &horseStoreMock{}}
	r, err := handler.NewRaceServer(store, a)
	require.NotNil(t, r)
	require.NoError(t, err)

	res, err := r.EditRace(context.TODO(), connect.NewRequest(&v1.EditRaceRequest{
		Id:          1,
		Name:        new(string),
		Order:       new(uint32),
		Start:       &timestamppb.Timestamp{},
		Description: new(string),
		Members:     []uint32{1, 2, 3, 4},
		AdminJwt:    &v1.JWT{Token: "token"},
	}))
	assert.NoError(t, err)
	assert.NotNil(t, res)
}
