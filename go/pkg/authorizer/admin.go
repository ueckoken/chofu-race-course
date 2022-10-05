package authorizer

import (
	"fmt"
	"time"
)

type AdminAuthorizer interface {
	VerifyPassword(password string) bool
	JWTIssuer
}

type AdminAuthorizerStruct struct {
	password string
	JWTIssuer
}

func NewAdminAuthorizer(path, password string, dur time.Duration) (*AdminAuthorizerStruct, error) {
	i, err := NewJWTIssuer(path, dur)
	if err != nil {
		return nil, fmt.Errorf("failed to create jwt issuer for admin, err=%w", err)
	}
	return &AdminAuthorizerStruct{password: password, JWTIssuer: i}, nil
}

func (a *AdminAuthorizerStruct) VerifyPassword(password string) bool {
	return a.password == password
}
