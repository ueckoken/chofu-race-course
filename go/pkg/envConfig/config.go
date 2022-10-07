package envConfig

import (
	"fmt"

	"github.com/caarlos0/env/v6"
)

type EnvVar struct {
	DataDir            string   `env:"DATADIR"`
	ListenAddr         string   `env:"LISTEN_ADDR" envDefault:"127.0.0.1:8080"`
	AdminPassword      string   `env:"ADMIN_PASSWORD"`
	CorsArrowedOrigins []string `env:"CORS_ARROWED_ORIGINS" envSeparator:":"`
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
