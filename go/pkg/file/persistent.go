package file

import (
	"fmt"
	"log"
	"os"
	"sync"

	"google.golang.org/protobuf/proto"
)

type Persistent[T proto.Message] struct {
	data     T
	filemtx  sync.Mutex
	filePath string
}

func NewPersistentStruct[T proto.Message](filePath string, buf T) (*Persistent[T], error) {
	if _, err := os.Stat(filePath); !os.IsNotExist(err) {
		b, err := os.ReadFile(filePath)
		if err != nil {
			return nil, fmt.Errorf("failed to read, err=%w", err)
		}

		if err := proto.Unmarshal(b, buf); err != nil {
			return nil, fmt.Errorf("failed to unmarshaling, err=%w", err)
		}
		return &Persistent[T]{
			data:     buf,
			filemtx:  sync.Mutex{},
			filePath: filePath,
		}, nil
	}
	return &Persistent[T]{
		data:     buf,
		filemtx:  sync.Mutex{},
		filePath: filePath,
	}, nil

}

// Set replace current data with arg.
func (h *Persistent[T]) Set(d T) error {
	h.filemtx.Lock()
	defer h.filemtx.Unlock()
	f, err := os.Create(h.filePath)
	if err != nil {
		return fmt.Errorf("failed to create file, err=%w", err)
	}
	log.Println(d)
	defer func() {
		if err := f.Close(); err != nil {
			log.Println("failed to close, err=%w", err)
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
