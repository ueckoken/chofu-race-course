package authorizer

import (
	"crypto/ed25519"
	"crypto/rand"
	"fmt"
	"io"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
)

// JWTIssuer is a set of private and public key and can sign and verify jwt
type JWTIssuer interface {
	Sign(audience string) (jwt string, err error)
	Verify(j string) (username string, ok bool, err error)
}

// KeyPairED25519 is a pair of publickey and private key
type KeyPairED25519 struct {
	issuerName string
	ttl        time.Duration
	privkey    ed25519.PrivateKey
	pubkey     ed25519.PublicKey
}

func newEd25519Keypair(issuerName string, ttl time.Duration) (*KeyPairED25519, error) {
	pub, priv, err := ed25519.GenerateKey(rand.Reader)
	if err != nil {
		return nil, fmt.Errorf("failed to create ed25519 keypair, err=%w", err)
	}
	ret := KeyPairED25519{issuerName: issuerName, privkey: priv, pubkey: pub, ttl: ttl}
	return &ret, nil
}

func savePrivKey(p ed25519.PrivateKey, path string) error {
	f, err := os.OpenFile(path, os.O_RDWR|os.O_CREATE, 0600)
	if err != nil {
		return fmt.Errorf("failed to create jwt private key file, err=%w", err)
	}
	defer f.Close()
	if _, err := f.Write(p); err != nil {
		return fmt.Errorf("failed to write jwt private key to file, err=%w", err)
	}
	return nil
}

func loadPrivKey(path string) (*ed25519.PrivateKey, error) {
	f, err := os.OpenFile(path, os.O_RDONLY, 0600)
	if err != nil {
		return nil, fmt.Errorf("failed to create jwt private key file, err=%w", err)
	}
	defer f.Close()
	p, err := io.ReadAll(f)
	if err != nil {
		return nil, fmt.Errorf("failed to read private key although private key file already exists, err=%w", err)
	}
	if len(p) != ed25519.PrivateKeySize {
		return nil, fmt.Errorf("filesize is not met to ed25519 keysize, got=%d, expected=%d", len(p), ed25519.PrivateKeySize)
	}
	ep := ed25519.PrivateKey(p)
	return &ep, nil
}

// NewJWTIssuer creates jwt issuer and saves private key to specified path if not exists. If exists, loads private key and restores
func NewJWTIssuer(path string, generalExpiry time.Duration) (*KeyPairED25519, error) {
	if _, err := os.Stat(path); os.IsNotExist(err) {
		userauthorizer, err := newEd25519Keypair("generalUser", generalExpiry)
		if err != nil {
			return nil, fmt.Errorf("failed to create generalUser keypair, err=%w", err)
		}
		if err := savePrivKey(userauthorizer.privkey, path); err != nil {
			return nil, fmt.Errorf("failed to save private key, err=%w", err)
		}
		return userauthorizer, nil
	}
	ep, err := loadPrivKey(path)
	if err != nil {
		return nil, fmt.Errorf("failed to load private key, err=%w", err)
	}
	k := &KeyPairED25519{issuerName: "generalUser", ttl: generalExpiry, privkey: *ep, pubkey: ep.Public().(ed25519.PublicKey)}
	return k, nil
}

// Sign sign received username with key
func (i *KeyPairED25519) Sign(audience string) (string, error) {
	now := time.Now()
	claim := &jwt.StandardClaims{
		Audience:  audience,
		IssuedAt:  now.Unix(),
		NotBefore: now.Unix(),
		ExpiresAt: now.Add(i.ttl).Unix(),
		Issuer:    i.issuerName,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodEdDSA, claim)
	ret, err := token.SignedString(i.privkey)
	if err != nil {
		return "", err
	}
	return ret, nil
}

// Verify verifies jwt
func (i *KeyPairED25519) Verify(j string) (username string, ok bool, err error) {
	token, err := jwt.Parse(j, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodEd25519); !ok {
			return false, fmt.Errorf("token is not signed ed25519, signed by %v, unexpected algorithm", token.Header["alg"])
		}
		return i.pubkey, nil
	})
	if err != nil {
		return "", false, fmt.Errorf("failed to parse jwt, err=%w", err)
	}
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		err := claims.Valid()
		if err != nil {
			return "", false, fmt.Errorf("token expired, err=%w", err)
		}
		if claims["iss"] != i.issuerName {
			return "", false, fmt.Errorf("token is signed by other issuer")
		}
		return claims["aud"].(string), true, nil
	}
	return "", ok, fmt.Errorf("token is not valid")
}
