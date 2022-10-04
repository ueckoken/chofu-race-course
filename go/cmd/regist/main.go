package main

import (
	"context"
	"flag"

	"github.com/google/subcommands"
	horseregist "github.com/ueckoken/chofu-race-course/go/cmd/horseRegist"
)

func main() {
	subcommands.Register(&horseregist.Regist{}, "")
	flag.Parse()

	ctx := context.Background()
	subcommands.Execute(ctx)
}
