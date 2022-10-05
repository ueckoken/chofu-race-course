package file

import (
	"fmt"
	"os"
	"sort"
	"sync"
	"time"

	v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"
	"google.golang.org/protobuf/proto"
)

type Race struct {
	filepath string
	mu       *sync.RWMutex
}

func NewRaceFile(path string) (*Race, error) {
	w := &Race{
		filepath: path,
		mu:       &sync.RWMutex{},
	}
	w.mu.Lock()
	defer w.mu.Unlock()
	if err := createFileIfNotExist(w.filepath); err != nil {
		return nil, err
	}
	return w, nil
}

// GetRange は引数に入れた時間を絞る。出走時間を対象とする。
func (w *Race) GetRange(from, to time.Time) ([]*v1.RaceDetail, error) {
	return nil, fmt.Errorf("not implemented")
}
func (w *Race) GetAll() ([]*v1.RaceDetail, error) {
	rds := []*v1.RaceDetail{}
	rawRds, err := w.readFromFile()
	if err != nil {
		return nil, err
	}
	return append(rds, rawRds.GetRaceDetails()...), nil
}
func (w *Race) GetById(id uint32) (*v1.RaceDetail, error) {
	rds, err := w.GetAll()
	if err != nil {
		return nil, err
	}
	for _, rd := range rds {
		if rd.GetData().GetId() == id {
			return rd, nil
		}
	}
	return nil, notFound
}

// Create は新しいレースを登録します。rd の中にあるIDが0の場合は新しいIDを付与します
func (w *Race) Create(rd *v1.RaceDetail) error {
	if rd.GetData().GetId() == 0 {
		id, err := w.supplyNewId()
		if err != nil {
			return err
		}
		rd.Data.Id = id
	}
	existedRec, err := w.GetById(rd.GetData().GetId())
	if existedRec != nil {
		return fmt.Errorf("already existed")
	}
	if err != nil && err != notFound {
		return err
	}
	oldRecs, err := w.GetAll()
	if err != nil {
		return err
	}
	appended := append(oldRecs, rd)
	w.mu.Lock()
	defer w.mu.Unlock()
	f, err := os.Create(w.filepath)
	if err != nil {
		return err
	}
	defer f.Close()
	b, err := proto.Marshal(&v1.RaceDetails{RaceDetails: appended})
	if err != nil {
		return err
	}
	_, err = f.Write(b)
	return err
}

func (w *Race) readFromFile() (*v1.RaceDetails, error) {
	w.mu.RLock()
	defer w.mu.RUnlock()
	data, err := os.ReadFile(w.filepath)
	if err != nil {
		return nil, err
	}
	rds := &v1.RaceDetails{}
	err = proto.Unmarshal(data, rds)
	if err != nil {
		return nil, err
	}
	return rds, nil
}

// supplyNewId はデータベースから最も大きいIDを検索し、そのIDに1を足した値を返します。
func (w *Race) supplyNewId() (uint32, error) {
	rs, err := w.GetAll()
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
