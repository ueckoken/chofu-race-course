package internal

import (
	"fmt"
	"net/http"
	"path/filepath"
	"time"

	"github.com/ueckoken/chofu-race-course/go/pkg/authorizer"
	"github.com/ueckoken/chofu-race-course/go/pkg/envConfig"
	"github.com/ueckoken/chofu-race-course/go/pkg/file"
	"github.com/ueckoken/chofu-race-course/go/pkg/handler"

	"github.com/ueckoken/chofu-race-course/go/_proto/spec/v1/v1connect"
)

func NewRoute(conf *envConfig.EnvVar) (*http.ServeMux, error) {
	mux := http.NewServeMux()
	userWriter, err := file.NewUserFile(filepath.Join(conf.DataDir, "user"))
	if err != nil {
		return nil, err
	}
	a, err := authorizer.NewAuthorizer("privatekey")
	if err != nil {
		return nil, fmt.Errorf("failed to initialize authorizer, err=%w", err)
	}
	ad, err := authorizer.NewAdminAuthorizer("adminprivatekey", conf.AdminPassword, 30*24*time.Hour)
	if err != nil {
		return nil, fmt.Errorf("failed to generate admin authorizer, err=%w", err)
	}
	u, err := handler.NewUserServer(userWriter, a, ad)
	if err != nil {
		return nil, err
	}
	mux.Handle(v1connect.NewUserDataServiceHandler(u))

	horseWriter, err := file.NewHorseFile(filepath.Join(conf.DataDir, "horse"))
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
