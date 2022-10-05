package file

import (
	"fmt"
	"os"
	"sort"
	"sync"

	v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"
	"google.golang.org/protobuf/proto"
)

type Horse struct {
	filePath string
	mu       *sync.RWMutex
}

func NewHorseFile(path string) (*Horse, error) {
	w := &Horse{
		filePath: path,
		mu:       &sync.RWMutex{},
	}
	w.mu.Lock()
	defer w.mu.Unlock()
	if err := createFileIfNotExist(w.filePath); err != nil {
		return nil, err
	}
	return w, nil
}

// Create は新しい馬を登録します。hの中にあるIDがデフォルト値(=0)の時は新しいIDを付与します。
func (w *Horse) Create(h *v1.HorseDetail) error {
	if h == nil {
		return fmt.Errorf("h is nil")
	}
	existedHorse, err := w.GetById(h.GetData().GetId())
	if existedHorse != nil {
		return recordDupricate
	}
	if err != nil && err != notFound {
		return err
	}
	if h.GetData().GetId() == 0 && h.GetData() != nil {
		id, err := w.supplyNewId()
		if err != nil {
			return err
		}
		h.Data.Id = id
	}
	if err := h.ValidateAll(); err != nil {
		return err
	}
	oldRecs, err := w.GetAll()
	if err != nil {
		return err
	}
	appended := append(oldRecs, h)
	w.mu.Lock()
	defer w.mu.Unlock()
	f, err := os.Create(w.filePath)
	if err != nil {
		return err
	}
	defer f.Close()
	b, err := proto.Marshal(&v1.HorseDetails{HorseDetails: appended})
	if err != nil {
		return err
	}
	_, err = f.Write(b)
	return err
}
func (w *Horse) GetAll() ([]*v1.HorseDetail, error) {
	rawHds, err := w.readFromFile()
	if err != nil {
		return nil, err
	}
	hds := make([]*v1.HorseDetail, 0)
	return append(hds, rawHds.HorseDetails...), nil
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

func (w *Horse) readFromFile() (*v1.HorseDetails, error) {
	w.mu.RLock()
	defer w.mu.RUnlock()
	data, err := os.ReadFile(w.filePath)
	if err != nil {
		return nil, err
	}
	hds := &v1.HorseDetails{}
	err = proto.Unmarshal(data, hds)
	if err != nil {
		return nil, err
	}
	return hds, nil
}

// supplyNewId はデータベースから最も大きいIDを検索し、そのIDに1を足した値を返します。
func (w *Horse) supplyNewId() (uint32, error) {
	hds, err := w.GetAll()
	if err != nil {
		return 0, err
	}
	// レコードが存在しないときは1を返す。idは1スタート
	if len(hds) < 1 {
		return 1, nil
	}
	// hdsを降順にソート
	sort.Slice(hds, func(i, j int) bool {
		return hds[i].GetData().GetId() > hds[j].GetData().GetId()
	})
	return hds[0].GetData().GetId() + 1, nil
}
