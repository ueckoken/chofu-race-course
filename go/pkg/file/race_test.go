package file_test

import (
	"path/filepath"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"
	"github.com/ueckoken/chofu-race-course/go/pkg/file"
	"github.com/ueckoken/chofu-race-course/go/pkg/handler"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func TestRaceFlow(t *testing.T) {
	path := filepath.Join(t.TempDir(), "race-test")
	r, err := file.NewRaceFile(path)
	assert.NoError(t, err)
	require.NotNil(t, r)
	assert.Implements(t, (*handler.RaceStore)(nil), r)

	res, err := r.GetById(0)
	assert.Nil(t, res)
	assert.Error(t, err, "レコードが存在しないときはnotfoundエラー")

	test1 := &v1.RaceDetail{
		Data: &v1.Race{
			// IDが0のときは自動付番
			Id:         0,
			Name:       "テスト1",
			Order:      1,
			Start:      &timestamppb.Timestamp{},
			IsFinished: false,
		},
	}
	err = r.Create(test1)
	assert.NoError(t, err, "初めての登録なので衝突せずに登録ができる")

	rds, err := r.GetAll()
	assert.Len(t, rds.GetRaceDetails(), 1, "1件目のレコード")
	assert.NoError(t, err, "正常に取得できる")
	assert.Equal(t, uint32(1), rds.GetRaceDetails()[0].GetData().GetId(), "ID=0を与えたときはオートインクリメントして追加")

	err = r.Create(&v1.RaceDetail{Data: &v1.Race{Id: 10, Name: "テスト2", Order: 0}})
	assert.NoError(t, err)
	rds, err = r.GetAll()
	assert.Len(t, rds.GetRaceDetails(), 2)
	assert.NoError(t, err)

	rd, err := r.GetById(10)
	assert.NoError(t, err)
	assert.NotNil(t, rd)
	assert.NotNil(t, rd.GetData())
	assert.Equal(t, uint32(10), rd.GetData().GetId())
}
func TestRaceUpdate(t *testing.T) {
	r, err := file.NewRaceFile(filepath.Join(t.TempDir(), "update"))
	require.NotNil(t, r)
	require.NoError(t, err)
	test1 := &v1.RaceDetail{
		Data: &v1.Race{
			Id:         1,
			Name:       "テスト1",
			Order:      1,
			Start:      timestamppb.Now(),
			IsFinished: false,
		},
	}
	err = r.Create(test1)
	require.NoError(t, err)

	err = r.Update(&v1.RaceDetail{Data: &v1.Race{
		Id:    2,
		Name:  "テスト2",
		Order: 1,
	}})
	assert.Error(t, err, "IDに紐づくレコードが存在しないのでエラー")

	start := timestamppb.Now()
	err = r.Update(&v1.RaceDetail{
		Data: &v1.Race{
			Id:    1,
			Name:  "更新のテスト",
			Order: 1,
			Start: start,
		},
		VoteBegin: start,
		VoteEnd:   start,
	},
	)
	assert.NoError(t, err)
	rd, _ := r.GetById(1)
	assert.Equal(t, "更新のテスト", rd.GetData().GetName())

	rds, _ := r.GetAll()
	assert.Len(t, rds.GetRaceDetails(), 1, "レコード数は変化しない")
}
func TestRaceDelete(t *testing.T) {
	r, err := file.NewRaceFile(filepath.Join(t.TempDir(), "delete"))
	require.NotNil(t, r)
	require.NoError(t, err)
	test1 := &v1.RaceDetail{
		Data: &v1.Race{
			Id:         1,
			Name:       "テスト1",
			Order:      1,
			Start:      timestamppb.Now(),
			IsFinished: false,
		},
	}
	test2 := &v1.RaceDetail{
		Data: &v1.Race{
			Id:         2,
			Name:       "テスト2",
			Order:      1,
			Start:      timestamppb.Now(),
			IsFinished: false,
		},
	}
	err = r.Create(test1)
	require.NoError(t, err)
	err = r.Create(test2)
	require.NoError(t, err)

	rs, err := r.GetAll()
	require.NoError(t, err)
	require.Len(t, rs.GetRaceDetails(), 2)

	err = r.Delete(3)
	assert.Error(t, err, "存在しないIDを消そうとするとエラー")

	err = r.Delete(2)
	assert.NoError(t, err, "存在するIDなのでエラー")

	rs, err = r.GetAll()
	assert.NoError(t, err)
	assert.Len(t, rs.GetRaceDetails(), 1)

	err = r.Delete(1)
	assert.NoError(t, err)

	rs, err = r.GetAll()
	assert.NoError(t, err)
	assert.Len(t, rs.GetRaceDetails(), 0)
}
