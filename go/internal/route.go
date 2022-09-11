package internal

import (
	"github.com/ueckoken/chofu-race-course/go/pkg/handler"
	"net/http"

	"github.com/ueckoken/chofu-race-course/go/_proto/spec/v1/v1connect"
)

func NewRoute() (*http.ServeMux, error) {
	mux := http.NewServeMux()
  // TODO: fill path to save file
	u, err := handler.NewUserServer(nil)
	if err != nil {
		return nil, err
	}
	mux.Handle(v1connect.NewUserDataServiceHandler(u))
	return mux, nil
}
