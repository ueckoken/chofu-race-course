package file

import (
	"os"
	"sync"

	v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"

	"google.golang.org/protobuf/proto"
)

type User struct {
	filePath string
	mu       *sync.RWMutex
}

func NewUserFile(path string) (*User, error) {
	w := &User{filePath: path, mu: &sync.RWMutex{}}

	w.mu.Lock()
	defer w.mu.Unlock()
	_, err := os.Stat(w.filePath)
	if err != nil {
		f, err := os.Create(w.filePath)
		if err != nil {
			return nil, err
		}
		defer f.Close()
	}

	return w, nil
}

func (w *User) Create(u *v1.User) error {
	userInRec, err := w.GetById(u.GetId())
	if userInRec != nil {
		return recordDupricate
	}
	if err != nil && err != notFound {
		return err
	}
	oldRecs, err := w.GetAll()
	if err != nil {
		return err
	}
	newRecs := append(oldRecs, u)
	w.mu.Lock()
	defer w.mu.Unlock()
	f, err := os.Create(w.filePath)
	if err != nil {
		return err
	}
	defer f.Close()
	b, err := proto.Marshal(&v1.Users{Users: newRecs})
	if err != nil {
		return err
	}
	_, err = f.Write(b)
	return err
}

// GetById は与えたIDを持つUserを返す。存在しないときはErrorを返す。
func (w *User) GetById(id string) (*v1.User, error) {
	us, err := w.GetAll()
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

func (w *User) GetAll() ([]*v1.User, error) {
	return w.readFromFile()
}
func (w *User) readFromFile() ([]*v1.User, error) {
	w.mu.RLock()
	defer w.mu.RUnlock()
	bin, err := os.ReadFile(w.filePath)
	if err != nil {
		return nil, err
	}
	us := &v1.Users{}
	err = proto.Unmarshal(bin, us)
	if err != nil {
		return nil, err
	}
	return us.GetUsers(), nil
}
