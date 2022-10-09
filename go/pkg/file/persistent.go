package file

import (
	"fmt"
	"os"
	"sync"

	"google.golang.org/protobuf/proto"
)

type Persistent[T proto.Message] struct {
	data     T
	filemtx  sync.Mutex
	filePath string
}

func NewPersistentStruct[T proto.Message](filePath string) (*Persistent[T], error) {
	if _, err := os.Stat(filePath); os.IsExist(err) {
		b, err := os.ReadFile(filePath)
		if err != nil {
			return nil, fmt.Errorf("failed to read, err=%w", err)
		}
		var t T
		if err := proto.Unmarshal(b, t); err != nil {
			return nil, fmt.Errorf("failed to unmarshaling, err=%w", err)
		}
		return &Persistent[T]{
			data: t,
			filemtx: sync.Mutex{},
			filePath: filePath,
		}, nil
	}
	var t T
	b, err := proto.Marshal(t)
	if err != nil {
		panic("newHorseCacheStruct: failed to marshal constant value")
	}
	f, err := os.Create(filePath)
	if err != nil {
		return nil, fmt.Errorf("failed to create file for persistent, err=%w", err)
	}
	defer func() {
		if err := f.Close(); err != nil {
			fmt.Println("failed to close, err=%w", err)
		}
	}()
	if _, err := f.Write(b); err != nil {
		return nil, fmt.Errorf("failed to write, err=%w", err)
	}
	return &Persistent[T]{
		data:     t,
		filemtx:  sync.Mutex{},
		filePath: filePath,
	}, nil

}

// Set replace current data with arg
func (h *Persistent[T]) Set(d T) error {
	h.filemtx.Lock()
	defer h.filemtx.Unlock()
	f, err := os.Create(h.filePath)
	if err != nil {
		return fmt.Errorf("failed to create file, err=%w", err)
	}
	defer func() {
		if err := f.Close(); err != nil {
			fmt.Println("failed to close, err=%w", err)
		}
	}()
	h.data = d
	b, err := proto.Marshal(d)
	if err != nil {
		return fmt.Errorf("failed to marshaling, err=%w", err)
	}
	if _, err := f.Write(b); err != nil {
		return fmt.Errorf("failed to write, err=%w", err)
	}
	return nil
}

func (h *Persistent[T]) Get() (T, error) {
	return h.data, nil
}
