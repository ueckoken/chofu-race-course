package file

import (
	"fmt"
	"sort"
	"sync"

	v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"
)

// Horse contains file data and its cache.
type Horse struct {
	cache *Persistent[*v1.HorseDetails]
	mu    *sync.Mutex
}

// NewHorseFile creates something like file for persistent.
func NewHorseFile(path string) (*Horse, error) {
	hc, err := NewPersistentStruct(path, &v1.HorseDetails{})
	if err != nil {
		return nil, fmt.Errorf("failed to create horseCacheStruct, err=%w", err)
	}
	return &Horse{
		cache: hc,
		mu:    &sync.Mutex{},
	}, nil
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
		id, err := w.supplyNewID()
		if err != nil {
			return err
		}
		h.Data.Id = id
	}
	if err := h.ValidateAll(); err != nil {
		return err
	}
	w.mu.Lock()
	defer w.mu.Unlock()
	oldRecs, err := w.GetAll()
	if err != nil {
		return err
	}
	appended := append(oldRecs.GetHorseDetails(), h)
	if err := w.cache.Set(&v1.HorseDetails{HorseDetails: appended}); err != nil {
		return fmt.Errorf("failed to write, err=%w", err)
	}
	return nil
}

func (w *Horse) GetAll() (*v1.HorseDetails, error) {
	return w.cache.Get()
}

func (w *Horse) GetById(id uint32) (*v1.HorseDetail, error) {
	hs, err := w.GetAll()
	if err != nil {
		return nil, err
	}
	for _, h := range hs.GetHorseDetails() {
		if h.GetData().GetId() == id {
			return h, nil
		}
	}
	return nil, notFound
}

func (w *Horse) Update(newHd *v1.HorseDetail) error {
	if err := newHd.ValidateAll(); err != nil {
		return err
	}
	w.mu.Lock()
	defer w.mu.Unlock()
	hds, err := w.GetAll()
	if err != nil {
		return err
	}
	isExist := false
	for i, hd := range hds.GetHorseDetails() {
		if hd.GetData().GetId() == newHd.GetData().GetId() {
			hds.HorseDetails[i] = newHd
			isExist = true
			break
		}
	}
	if !isExist {
		return notFound
	}
	if err := w.cache.Set(&v1.HorseDetails{HorseDetails: hds.GetHorseDetails()}); err != nil {
		return fmt.Errorf("failed to write, err=%w", err)
	}
	return nil
}

// supplyNewID はデータベースから最も大きいIDを検索し、そのIDに1を足した値を返します。
func (w *Horse) supplyNewID() (uint32, error) {
	hds, err := w.GetAll()
	if err != nil {
		return 0, err
	}
	// レコードが存在しないときは1を返す。idは1スタート
	if len(hds.GetHorseDetails()) < 1 {
		return 1, nil
	}
	// hdsを降順にソート
	sort.Slice(hds.GetHorseDetails(), func(i, j int) bool {
		return hds.GetHorseDetails()[i].GetData().GetId() > hds.GetHorseDetails()[j].GetData().GetId()
	})
	return hds.GetHorseDetails()[0].GetData().GetId() + 1, nil
}
