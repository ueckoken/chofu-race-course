package main

import (
	"log"
	"net/http"

	"github.com/ueckoken/chofu-race-course/go/internal"
	envConfig "github.com/ueckoken/chofu-race-course/go/pkg/envConfig"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

func main() {
	env, err := envConfig.Parse()
	if err != nil {
		log.Fatal(err)
	}
	route, err := internal.NewRoute(env.DataDir)
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("listen in %s\n", env.ListenAddr)
	err = http.ListenAndServe(
		env.ListenAddr,
		h2c.NewHandler(route, &http2.Server{}),
	)
	if err != nil {
		log.Fatal(err)
	}
}
