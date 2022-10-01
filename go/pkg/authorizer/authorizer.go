package authorizer

import (
	"fmt"
	"time"
)

// Authorizer authorize user and persist its
type Authorizer struct {
	JWTIssuer
}

func NewAuthorizer(path string) (*Authorizer, error) {
	p, err := NewJWTIssuer(path, 30*24*time.Hour)
	if err != nil {
		return nil, fmt.Errorf("failed to create jwt issuer, err=%w", err)
	}
	return &Authorizer{JWTIssuer: p}, nil
}
