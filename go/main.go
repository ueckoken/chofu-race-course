package main

import (
	"log"
	"net/http"

	"github.com/rs/cors"
	"github.com/ueckoken/chofu-race-course/go/internal"
	"github.com/ueckoken/chofu-race-course/go/pkg/envConfig"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

func main() {
	env, err := envConfig.Parse()
	if err != nil {
		log.Fatal(err)
	}
	route, err := internal.NewRoute(env)
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("listening in %s\n", env.ListenAddr)

	corsConf := cors.New(cors.Options{
		//TODO; これらの設定を環境変数で入れられるように
		AllowedOrigins:   env.CorsArrowedOrigins,
		AllowCredentials: true,
	})
	err = http.ListenAndServe(
		env.ListenAddr,
		corsConf.Handler(h2c.NewHandler(route, &http2.Server{})),
	)
	if err != nil {
		log.Fatal(err)
	}
}
