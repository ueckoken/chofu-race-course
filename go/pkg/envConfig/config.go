package envConfig

import (
	"github.com/caarlos0/env/v6"
)

type EnvVar struct {
	DataDir            string   `env:"DATADIR,notEmpty"`
	ListenAddr         string   `env:"LISTEN_ADDR" envDefault:"127.0.0.1:8080"`
	AdminPassword      string   `env:"ADMIN_PASSWORD,notEmpty"`
	CorsArrowedOrigins []string `env:"CORS_ARROWED_ORIGINS" envSeparator:"," envDefault:"localhost"`
}

func Parse() (*EnvVar, error) {
	cfg := EnvVar{}
	if err := env.Parse(&cfg); err != nil {
		return nil, err
	}
	return &cfg, nil
}
