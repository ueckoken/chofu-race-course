package main

import (
	"log"
	"net/http"

	"github.com/ueckoken/chofu-race-course/go/internal"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

func main() {
	err := http.ListenAndServe(
		"localhost:8080",
		h2c.NewHandler(internal.NewRoute(), &http2.Server{}),
	)
	if err != nil {
		log.Fatal(err)
	}
}
