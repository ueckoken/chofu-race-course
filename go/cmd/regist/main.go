package main

import (
	"context"
	"flag"

	"github.com/google/subcommands"
	"github.com/ueckoken/chofu-race-course/go/cmd/regist/horse"
)

func main() {
	subcommands.Register(&horse.Regist{}, "")
	flag.Parse()

	ctx := context.Background()
	subcommands.Execute(ctx)
}
