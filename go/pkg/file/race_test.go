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
	r, err := file.NewRaceFile(filepath.Join(t.TempDir(), "race-test"))
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
	assert.Len(t, rds, 1, "1件目のレコード")
	assert.NoError(t, err, "正常に取得できる")
	assert.Equal(t, uint32(1), rds[0].GetData().GetId(), "ID=0を与えたときはオートインクリメントして追加")

	err = r.Create(&v1.RaceDetail{Data: &v1.Race{Id: 10, Name: "テスト2", Order: 0}})
	assert.NoError(t, err)
	rds, err = r.GetAll()
	assert.Len(t, rds, 2)
	assert.NoError(t, err)

	rd, err := r.GetById(10)
	assert.NoError(t, err)
	assert.NotNil(t, rd)
	assert.NotNil(t, rd.GetData())
	assert.Equal(t, uint32(10), rd.GetData().GetId())
}
