package internal

import (
	"net/http"
	"path"

	"github.com/ueckoken/chofu-race-course/go/pkg/handler"
	"github.com/ueckoken/chofu-race-course/go/pkg/storage"

	"github.com/ueckoken/chofu-race-course/go/_proto/spec/v1/v1connect"
)

func NewRoute(dataDir string) (*http.ServeMux, error) {
	mux := http.NewServeMux()
	userWriter, err := storage.NewWriter(path.Join(dataDir, "user"))
	if err != nil {
		return nil, err
	}
	u, err := handler.NewUserServer(userWriter)
	if err != nil {
		return nil, err
	}
	mux.Handle(v1connect.NewUserDataServiceHandler(u))
	return mux, nil
}
