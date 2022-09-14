package file

import (
	"bufio"
	"errors"
	"os"
	"sync"

	v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"

	"google.golang.org/protobuf/proto"
)

type User struct {
	filePath string
	mu       *sync.Mutex
}

var notFound = errors.New("record not found")

func NewUserFile(path string) (*User, error) {
	return &User{filePath: path, mu: &sync.Mutex{}}, nil
}

func (w *User) Create(u *v1.User) error {
	if _, err := w.GetById(u.GetId()); err != nil {
		return err
	}
	w.mu.Lock()
	defer w.mu.Unlock()
	f, err := os.OpenFile(w.filePath, os.O_APPEND, 0644)
	if err != nil {
		return err
	}
	defer f.Close()
	b, err := proto.Marshal(u)
	if err != nil {
		return nil
	}
	_, err = f.Write(append(b, '\n'))
	return err
}

// GetById は与えたIDを持つUserを返す。存在しないときはErrorを返す。
func (w *User) GetById(id string) (*v1.User, error) {
	us, err := w.readFromFile()
	if err != nil {
		return nil, err
	}
	for _, u := range us {
		if u.GetId() == id {
			return u, nil
		}
	}
	return nil, notFound
}

func (w *User) readFromFile() ([]*v1.User, error) {
	us := make([]*v1.User, 1)
	w.mu.Lock()
	defer w.mu.Unlock()
	f, err := os.Open(w.filePath)
	if err != nil {
		return nil, err
	}
	defer f.Close()
	sc := bufio.NewScanner(f)
	for sc.Scan() {
		u := &v1.User{}
		if err := proto.Unmarshal(sc.Bytes(), u); err != nil {
			return nil, err
		}
		us = append(us, u)
	}
	return us, nil
}