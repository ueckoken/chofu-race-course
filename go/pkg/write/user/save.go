package user

import (
	"os"
	"sync"
)

type Writer struct {
	file *os.File
	mtx  *sync.Mutex
}

func NewWriter(path string) (*Writer, error) {
	file, err := os.Create(path)
	if err != nil {
		return nil, err
	}
	return &Writer{file: file, mtx: &sync.Mutex{}}, nil
}
