package file

import (
	"bufio"
	"os"
	"sync"

	v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"
	"google.golang.org/protobuf/proto"
)

type Horse struct {
	filePath string
	mu       *sync.Mutex
}

func NewHorseFile(path string) (*Horse, error) {
	return &Horse{filePath: path, mu: &sync.Mutex{}}, nil
}

func (w *Horse) Create(h *v1.HorseDetail) error {
	if _, err := w.GetById(h.GetData().GetId()); err != nil {
		return err
	}
	w.mu.Lock()
	defer w.mu.Unlock()
	f, err := os.OpenFile(w.filePath, os.O_APPEND, 0644)
	if err != nil {
		return err
	}
	defer f.Close()
	b, err := proto.Marshal(h)
	if err != nil {
		return nil
	}
	_, err = f.Write(append(b, '\n'))
	return err
}
func (w *Horse) GetAll() ([]*v1.HorseDetail, error) {
	return w.readFromFile()
}

func (w *Horse) GetById(id uint32) (*v1.HorseDetail, error) {
	hs, err := w.GetAll()
	if err != nil {
		return nil, err
	}
	for _, h := range hs {
		if h.GetData().GetId() == id {
			return h, nil
		}
	}
	return nil, notFound
}

func (w *Horse) readFromFile() ([]*v1.HorseDetail, error) {
	hs := make([]*v1.HorseDetail, 1)
	w.mu.Lock()
	defer w.mu.Unlock()
	f, err := os.Open(w.filePath)
	if err != nil {
		return nil, err
	}
	defer f.Close()
	sc := bufio.NewScanner(f)
	for sc.Scan() {
		h := &v1.HorseDetail{}
		if err := proto.Unmarshal(sc.Bytes(), h); err != nil {
			return nil, err
		}
		hs = append(hs, h)
	}
	return hs, nil
}
