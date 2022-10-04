package horse

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/bufbuild/connect-go"
	"github.com/google/subcommands"
	v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"
	"github.com/ueckoken/chofu-race-course/go/_proto/spec/v1/v1connect"
)

type Regist struct {
	endpoint  string
	horseName string
	owner     string
	password  string
}

func (r *Regist) Name() string {
	return "horse"
}
func (r *Regist) Synopsis() string {
	return "競走馬の登録をします"
}
func (r *Regist) Usage() string {
	return r.Synopsis()
}
func (r *Regist) SetFlags(f *flag.FlagSet) {
	f.StringVar(&r.endpoint, "endpoint", "", "")
	f.StringVar(&r.password, "password", "", "")
	f.StringVar(&r.horseName, "horse", "", "馬の名前")
	f.StringVar(&r.owner, "owner", "", "オーナーの名前")
}
func (r *Regist) Execute(ctx context.Context, f *flag.FlagSet, args ...interface{}) subcommands.ExitStatus {
	if len(r.endpoint) == 0 {
		log.Printf("endpoint is required")
		return subcommands.ExitFailure
	}
	client := &http.Client{}
	userClient := v1connect.NewUserDataServiceClient(client, r.endpoint)
	res, err := userClient.LoginAsAdmin(ctx, &connect.Request[v1.LoginAsAdminRequest]{Msg: &v1.LoginAsAdminRequest{Password: r.password}})
	if err != nil {
		log.Printf("login as admin failed. error is `%s`", err)
		return subcommands.ExitFailure
	}

	jwt := res.Msg.GetAdminJwt()
	fmt.Printf("%+v", jwt.GetToken())
	horseClient := v1connect.NewHorseDataServiceClient(client, r.endpoint)
	_, err = horseClient.RegisterHorse(ctx, &connect.Request[v1.RegisterHorseRequest]{Msg: &v1.RegisterHorseRequest{
		Name:     r.horseName,
		Owner:    r.owner,
		AdminJwt: jwt,
	}})
	if err != nil {
		log.Printf("regist horse error. error is `%s`", err)
		return subcommands.ExitFailure
	}
	return subcommands.ExitSuccess
}
