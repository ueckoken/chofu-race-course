package internal

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"path"
	"strings"

	"github.com/bufbuild/connect-go"
	"github.com/ueckoken/chofu-race-course/go/pkg/authorizer"
	"github.com/ueckoken/chofu-race-course/go/pkg/file"
	"github.com/ueckoken/chofu-race-course/go/pkg/handler"

	"github.com/ueckoken/chofu-race-course/go/_proto/spec/v1/v1connect"
)

type endpoints struct {
	authRequiedEndpoints []string
}

// isNeedAuthForProcedure returns wheater procedure(endpoint) needs user authentication
// procedure must have starting slash
// procedure example:
// - /spec.v1.UserDataService/UserData
func (e *endpoints) isNeedUserAuthForProcedure(procedure string) bool {
	for _, a := range e.authRequiedEndpoints {
		if a == strings.Replace(procedure, "/", "", -1) {
			return true
		}
	}
	return false
}

func NewRoute(dataDir string) (*http.ServeMux, error) {
	mux := http.NewServeMux()
	userWriter, err := file.NewUserFile(path.Join(dataDir, "user"))
	if err != nil {
		return nil, err
	}
	u, err := handler.NewUserServer(userWriter)
	if err != nil {
		return nil, err
	}
	a, err := authorizer.NewAuthorizer("privatekey")
	if err != nil {
		return nil, fmt.Errorf("failed to initialize authorizer, err=%w", err)
	}
	ep := endpoints{authRequiedEndpoints: []string{"/spec.v1.UserDataService/UserData", "/spec.v1.VoteService/Vote"}}
	mux.Handle(v1connect.NewUserDataServiceHandler(u, connect.WithInterceptors(
		connect.UnaryInterceptorFunc(
			func(next connect.UnaryFunc) connect.UnaryFunc {
				return connect.UnaryFunc(func(ctx context.Context, req connect.AnyRequest) (connect.AnyResponse, error) {
					if !ep.isNeedUserAuthForProcedure(req.Spec().Procedure) {
						res, err := next(ctx, req)
						return res, err
					}
					token := req.Header().Get("Bearer")
					u, ok, err := a.Verify(token)
					if err != nil {
						//TODO: use sufficient error code
						log.Printf("failed to read token, err=%s", err)
						return nil, fmt.Errorf("failed to read token, unauthorized")
					}
					if !ok {
						log.Printf("failed to verify, err=%s", err)
						return nil, fmt.Errorf("verification failed, unauthorized")
					}
					c := context.WithValue(ctx, "User", u)
					res, err := next(c, req)
					return res, err
				})
			},
		),
	)))
	return mux, nil
}
