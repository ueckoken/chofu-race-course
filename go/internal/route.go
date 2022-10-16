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
	a, err := authorizer.NewAuthorizer("privatekey")
	if err != nil {
		return nil, fmt.Errorf("failed to initialize authorizer, err=%w", err)
	}
	ad, err := authorizer.NewAdminAuthorizer("adminprivatekey", conf.AdminPassword, 30*24*time.Hour)
	if err != nil {
		return nil, fmt.Errorf("failed to generate admin authorizer, err=%w", err)
	}

	userWriter, err := file.NewUserFile(filepath.Join(conf.DataDir, "user"))
	if err != nil {
		return nil, err
	}

	horseWriter, err := file.NewHorseFile(filepath.Join(conf.DataDir, "horse"))
	if err != nil {
		return nil, err
	}

	raceWriter, err := file.NewRaceFile(filepath.Join(conf.DataDir, "race"))
	if err != nil {
		return nil, err
	}

	store := handler.DataSaver{
		User:  userWriter,
		Horse: horseWriter,
		Race:  raceWriter,
	}
	u, err := handler.NewUserServer(userWriter, a, ad)
	if err != nil {
		return nil, err
	}
	mux.Handle(v1connect.NewUserDataServiceHandler(u))

	h, err := handler.NewHorseServer(horseWriter, ad)
	if err != nil {
		return nil, err
	}
	mux.Handle(v1connect.NewHorseDataServiceHandler(h))

	r, err := handler.NewRaceServer(raceWriter, ad)
	if err != nil {
		return nil, err
	}
	mux.Handle(v1connect.NewRaceDataServiceHandler(r))

	return mux, nil
}
