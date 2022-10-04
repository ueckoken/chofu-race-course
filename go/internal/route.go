package internal

import (
	"fmt"
	"net/http"
	"os"
	"path"
	"time"

	"github.com/ueckoken/chofu-race-course/go/pkg/authorizer"
	"github.com/ueckoken/chofu-race-course/go/pkg/file"
	"github.com/ueckoken/chofu-race-course/go/pkg/handler"

	"github.com/ueckoken/chofu-race-course/go/_proto/spec/v1/v1connect"
)

func NewRoute(dataDir string) (*http.ServeMux, error) {
	mux := http.NewServeMux()
	userWriter, err := file.NewUserFile(path.Join(dataDir, "user"))
	if err != nil {
		return nil, err
	}
	a, err := authorizer.NewAuthorizer("privatekey")
	if err != nil {
		return nil, fmt.Errorf("failed to initialize authorizer, err=%w", err)
	}
	ad, err := authorizer.NewAdminAuthorizer("adminprivatekey", os.Getenv("PASSWORD"), 30*24*time.Hour)
	if err != nil {
		return nil, fmt.Errorf("failed to generate admin authorizer, err=%w", err)
	}
	u, err := handler.NewUserServer(userWriter, a, ad)
	if err != nil {
		return nil, err
	}
	mux.Handle(v1connect.NewUserDataServiceHandler(u))

	horseWriter, err := file.NewHorseFile(path.Join(dataDir, "horse"))
	if err != nil {
		return nil, err
	}
	h, err := handler.NewHorseServer(horseWriter, ad)
	if err != nil {
		return nil, err
	}
	mux.Handle(v1connect.NewHorseDataServiceHandler(h))
	return mux, nil
}
