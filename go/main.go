package main

import (
	"log"
	"net/http"
	"time"

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
	log.Printf("listening on %s\n", env.ListenAddr)

	corsConf := cors.New(cors.Options{
		AllowedOrigins:   env.CorsArrowedOrigins,
		AllowCredentials: true,
	})
	err = http.ListenAndServe(
		env.ListenAddr,
		http.TimeoutHandler(corsConf.Handler(h2c.NewHandler(route, &http2.Server{})), 30*time.Second, "timeout"),
	)
	if err != nil {
		log.Fatal(err)
	}
}
