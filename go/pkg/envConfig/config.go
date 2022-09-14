package envconfig

import (
	"github.com/caarlos0/env/v6"
)

type envVars struct {
	DataDir    string `env:"DATADIR"`
	ListenAddr string `env:"LISTEN_ADDR"`
}

func Parse() (*envVars, error) {
	cfg := envVars{}
	if err := env.Parse(&cfg); err != nil {
		return nil, err
	}
	return &cfg, nil
}