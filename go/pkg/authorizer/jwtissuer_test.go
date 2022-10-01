package authorizer

import (
	"bytes"
	"crypto/ed25519"
	"testing"
	"time"
)

func TestSaveAndLoad(t *testing.T) {
	k, err := newEd25519Keypair("hoge", time.Second*5)
	if err != nil {
		t.Errorf("failed to create new ed25519 keypair, err=%s", err)
	}
	path := "test-priv"
	if err := savePrivKey(k.privkey, path); err != nil {
		t.Errorf("failed to save private key, err=%s", err)
	}
	kl, err := loadPrivKey(path)
	if err != nil {
		t.Errorf("failed to load private key, err=%s", err)
	}
	if !bytes.Equal(k.privkey, *kl) {
		t.Errorf("private key not match before and save private key")
	}
	pub := kl.Public()
	if !bytes.Equal(k.pubkey, pub.(ed25519.PublicKey)) {
		t.Errorf("public key not match before and save private key")
	}
}
