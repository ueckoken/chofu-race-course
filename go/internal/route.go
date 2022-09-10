package internal

import (
	"net/http"

	"github.com/ueckoken/chofu-race-course/go/_proto/spec/v1/v1connect"
	"github.com/ueckoken/chofu-race-course/go/pkg/serv/horse"
	"github.com/ueckoken/chofu-race-course/go/pkg/serv/race"
	"github.com/ueckoken/chofu-race-course/go/pkg/serv/user"
)

func NewRoute() *http.ServeMux {
	mux := http.NewServeMux()
	mux.Handle(v1connect.NewUserDataServiceHandler(&user.Server{}))
	mux.Handle(v1connect.NewHorseDataServiceHandler(&horse.Server{}))
	mux.Handle(v1connect.NewRaceDataServiceHandler(&race.Server{}))
	return mux
}
