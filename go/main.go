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
	srv := &http.Server{
		Addr:              env.ListenAddr,
		Handler:           corsConf.Handler(h2c.NewHandler(route, &http2.Server{})),
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       5 * time.Second,
		WriteTimeout:      10 * time.Second,
	}
	if err := srv.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
	if err != nil {
		log.Fatal(err)
	}
}
