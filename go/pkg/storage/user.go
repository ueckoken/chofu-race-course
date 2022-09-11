package storage

import (
	"errors"
	"sync"

	"github.com/ueckoken/chofu-race-course/go/pkg/store"

	v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"
)

type Writer struct {
	filePath string
	mtx      *sync.Mutex
}

var _ store.User = (*Writer)(nil)
var notFound = errors.New("record not found")

func NewWriter(path string) (*Writer, error) {
	return &Writer{filePath: path, mtx: &sync.Mutex{}}, nil
}

func (w *Writer) Create(u *v1.User) error {
	if _, err := w.GetById(u.GetId()); err != nil {
		return err
	}
	return nil
}

// GetById は与えたIDを持つUserを返す。存在しないときはErrorを返す。
func (w *Writer) GetById(id string) (*v1.User, error) {
	us, err := w.getUsers()
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

func (w *Writer) getUsers() ([]*v1.User, error) {
	return nil, nil
}
