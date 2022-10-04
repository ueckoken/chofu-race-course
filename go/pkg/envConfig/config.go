package envConfig

import (
	"fmt"

	"github.com/caarlos0/env/v6"
)

type EnvVar struct {
	DataDir       string `env:"DATADIR"`
	ListenAddr    string `env:"LISTEN_ADDR"`
	AdminPassword string `env:"ADMIN_PASSWORD"`
}

func Parse() (*EnvVar, error) {
	cfg := EnvVar{}
	if err := env.Parse(&cfg); err != nil {
		return nil, err
	}
	if cfg.AdminPassword == "" {
		return nil, fmt.Errorf("admin password is blank, please specify it by ADMIN_PASSWORD")
	}
	return &cfg, nil
}
