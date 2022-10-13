package handler

import (
	"context"
	"testing"

	"github.com/bufbuild/connect-go"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"
	"github.com/ueckoken/chofu-race-course/go/pkg/authorizer"
)

type horseStoreMock struct {
	HorseStore
	err error
}

func (m horseStoreMock) Create(h *v1.HorseDetail) error             { return m.err }
func (m horseStoreMock) GetAll() (*v1.HorseDetails, error)          { return &v1.HorseDetails{}, m.err }
func (m horseStoreMock) GetByID(id uint32) (*v1.HorseDetail, error) { return nil, m.err }

type adminAuthorizerMock struct {
	authorizer.AdminAuthorizer
}

func (adminAuthorizerMock) Verify(j string) (username string, ok bool, err error) {
	return "", true, nil
}

func TestRegisterHorse(t *testing.T) {
	h, err := NewHorseServer(horseStoreMock{}, adminAuthorizerMock{})
	assert.NoError(t, err)
	require.NotNil(t, h)

	res, err := h.RegisterHorse(context.Background(), &connect.Request[v1.RegisterHorseRequest]{Msg: &v1.RegisterHorseRequest{
		Name:     "カタカナ",
		Owner:    "オーナー",
		AdminJwt: &v1.JWT{Token: "AWESOME_TOKEN"},
	}})
	assert.NotNil(t, res)
	assert.NoError(t, err, "馬名とオーナー名の両方が条件を満たす")

	res, err = h.RegisterHorse(context.Background(), &connect.Request[v1.RegisterHorseRequest]{Msg: &v1.RegisterHorseRequest{
		Name:     "",
		Owner:    "オーナー",
		AdminJwt: &v1.JWT{Token: "AWESOME_TOKEN"},
	}})
	assert.Nil(t, res)
	assert.Error(t, err, "馬名が空")

	res, err = h.RegisterHorse(context.Background(), &connect.Request[v1.RegisterHorseRequest]{Msg: &v1.RegisterHorseRequest{
		Name:     "カタカナ",
		Owner:    "",
		AdminJwt: &v1.JWT{Token: "AWESOME_TOKEN"},
	}})
	assert.Nil(t, res)
	assert.Error(t, err, "オーナー名が空")

	res, err = h.RegisterHorse(context.Background(), &connect.Request[v1.RegisterHorseRequest]{Msg: &v1.RegisterHorseRequest{
		Name:     "馬名がカタカナ以外",
		Owner:    "オーナー名",
		AdminJwt: &v1.JWT{Token: "AWESOME_TOKEN"},
	}})
	assert.Nil(t, res)
	assert.Error(t, err, "馬名がカタカナ以外である")

	res, err = h.RegisterHorse(context.Background(), &connect.Request[v1.RegisterHorseRequest]{Msg: &v1.RegisterHorseRequest{
		Name:     "カタカナカタカナカタカナ",
		Owner:    "オーナー名",
		AdminJwt: &v1.JWT{Token: "AWESOME_TOKEN"},
	}})
	assert.Nil(t, res)
	assert.Error(t, err, "馬名の上限を越えている")
}
