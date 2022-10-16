package file

import (
	"fmt"
	"sort"

	v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"
)

// Race contains file data and its cache.
type Race struct {
	cache *Persistent[*v1.RaceDetails]
}

// NewRaceFile creates something like file for persistent.
func NewRaceFile(path string) (*Race, error) {
	hc, err := NewPersistentStruct(path, &v1.RaceDetails{})
	if err != nil {
		return nil, fmt.Errorf("failed to create horseCacheStruct, err=%w", err)
	}
	return &Race{
		cache: hc,
	}, nil
}

func (w *Race) GetAll() (*v1.RaceDetails, error) {
	return w.cache.Get()
}

func (w *Race) GetByID(id uint32) (*v1.RaceDetail, error) {
	rds, err := w.GetAll()
	if err != nil {
		return nil, err
	}
	for _, rd := range rds.GetRaceDetails() {
		if rd.GetData().GetId() == id {
			return rd, nil
		}
	}
	return nil, errNotFound
}

// Create は新しいレースを登録します。rd の中にあるIDが0の場合は新しいIDを付与します.
func (w *Race) Create(rd *v1.RaceDetail) error {
	if rd.GetData().GetId() == 0 {
		id, err := w.supplyNewID()
		if err != nil {
			return err
		}
		rd.Data.Id = id
	}
	existedRec, err := w.GetByID(rd.GetData().GetId())
	if existedRec != nil {
		return fmt.Errorf("already existed")
	}
	if err != nil && err != errNotFound {
		return err
	}
	oldRecs, err := w.GetAll()
	if err != nil {
		return err
	}
	appended := append(oldRecs.GetRaceDetails(), rd)
	if err := w.cache.Set(&v1.RaceDetails{RaceDetails: appended}); err != nil {
		return fmt.Errorf("failed to write, err=%w", err)
	}
	return nil
}

func (w *Race) Delete(id uint32) error {
	oldRecs2, err := w.GetAll()
	if err != nil {
		return err
	}
	oldRecs := oldRecs2.GetRaceDetails()
	var deleteID int
	isExist := false
	for i, rec := range oldRecs {
		if rec.GetData().GetId() == id {
			deleteID = i
			isExist = true
			break
		}
	}
	if !isExist {
		return errNotFound
	}
	oldRecs[deleteID] = oldRecs[len(oldRecs)-1]
	oldRecs[len(oldRecs)-1] = nil
	updatedRecs := oldRecs[:len(oldRecs)-1]

	if err := w.cache.Set(&v1.RaceDetails{RaceDetails: updatedRecs}); err != nil {
		return fmt.Errorf("failed to set, err=%w", err)
	}
	return err
}

// Update は *v1.RaceDetail の Data フィールドにある *v1.Race の IDを主キーとして更新します.
func (w *Race) Update(rec *v1.RaceDetail) error {
	if err := rec.ValidateAll(); err != nil {
		return err
	}
	oldRecs2, err := w.GetAll()
	if err != nil {
		return err
	}
	oldRecs := oldRecs2.GetRaceDetails()
	existRec := false
	id := rec.GetData().GetId()
	for i, oldRec := range oldRecs {
		if oldRec.GetData().GetId() == id {
			existRec = true
			oldRecs[i] = rec
			break
		}
	}
	if !existRec {
		return errNotFound
	}
	if err := w.cache.Set(&v1.RaceDetails{RaceDetails: oldRecs}); err != nil {
		return err
	}
	return nil
}

// supplyNewID はデータベースから最も大きいIDを検索し、そのIDに1を足した値を返します。
func (w *Race) supplyNewID() (uint32, error) {
	rs2, err := w.GetAll()
	rs := rs2.GetRaceDetails()
	if err != nil {
		return 0, err
	}
	// レコードが存在しないときは1を返す。idは1スタート
	if len(rs) < 1 {
		return 1, nil
	}
	// hdsを降順にソート
	sort.Slice(rs, func(i, j int) bool {
		return rs[i].GetData().GetId() > rs[j].GetData().GetId()
	})
	return rs[0].GetData().GetId() + 1, nil
}
