package handler

import (
	"github.com/ueckoken/chofu-race-course/go/_proto/spec/v1/v1connect"
)

type Horse struct {
	v1connect.UnimplementedHorseDataServiceHandler
	store HorseStore
}

type HorseStore interface{}

func NewHorseServer(store HorseStore) (*Horse, error) {

}
