package authorizer

import (
	"bytes"
	"crypto/ed25519"
	"fmt"
	"path/filepath"
	"testing"
	"time"
)

func saveandload(t *testing.T) (error){
	k, err := newEd25519Keypair("hoge", time.Second*5)
	if err != nil {
		return fmt.Errorf("failed to create new ed25519 keypair, err=%w", err)
	}
	path := filepath.Join(t.TempDir(), "test-priv")
	if err := savePrivKey(k.privkey, path); err != nil {
		return fmt.Errorf("failed to save private key, err=%w", err)
	}
	kl, err := loadPrivKey(path)
	if err != nil {
		return fmt.Errorf("failed to load private key, err=%w", err)
	}
	if !bytes.Equal(k.privkey, *kl) {
		return fmt.Errorf("private key not match before and save private key")
	}
	pub := kl.Public()
	if !bytes.Equal(k.pubkey, pub.(ed25519.PublicKey)) {
		return fmt.Errorf("public key not match before and save private key")
	}
	return nil
}

func TestSaveAndLoad(t *testing.T) {
	if err := saveandload(t); err != nil {
		t.Errorf("failed to test save and load %s", err)
	}
}

func TestReCreateJWTIssuer(t *testing.T){
	k1, err := NewJWTIssuer("a", time.Hour)
	if err != nil {
		t.Errorf("failed to generate first JWT issuer, err=%s", err)
	}
	k2, err := NewJWTIssuer("a", time.Hour)
	if err != nil {
		t.Errorf("failed to generate second JWT issuer, err=%s", err)
	}
	if !k1.privkey.Equal(k2.privkey){
		t.Errorf("not equal private key")
	}
	if !k1.pubkey.Equal(k2.pubkey){
		t.Errorf("not equal public key")
	}
	jwt, err := k1.Sign("hoge")
	if err != nil {
		t.Errorf("failed to sign by key1")
	}
	if _, ok, err := k1.Verify(jwt); err != nil || !ok{
		t.Errorf("failed to verify jwt signed by key1, by key1, err=%s", err)
	}
	if _, ok, err := k2.Verify(jwt); err != nil || !ok{
		t.Errorf("failed to verify jwt signed by key1, by key2, err=%s", err)
	}
}
