package file

import (
	"path/filepath"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"
)

func TestNewHorseFile(t *testing.T) {
	h, err := NewHorseFile(filepath.Join(t.TempDir(), "test-horse"))
	require.NotNil(t, h)
	require.Nil(t, err)
}

func TestCreate(t *testing.T) {
	h, err := NewHorseFile(filepath.Join(t.TempDir(), "test-create"))
	require.NotNil(t, h)
	require.NoError(t, err)

	err = h.Create(nil)
	assert.Error(t, err, "登録するデータが無いのでエラー")

	err = h.Create(&v1.HorseDetail{})
	assert.Error(t, err, "登録するデータが無いのでエラー")

	err = h.Create(&v1.HorseDetail{Data: &v1.Horse{Id: 0, Name: "ウマメイ"}, Owner: ""})
	assert.Error(t, err, "オーナー名は2文字以上")

	err = h.Create(&v1.HorseDetail{Data: &v1.Horse{Id: 0, Name: "ウマメイ"}, Owner: "ああ"})
	assert.NoError(t, err, "オーナー名は2文字以上")

	err = h.Create(&v1.HorseDetail{Data: &v1.Horse{Id: 0, Name: "うまめい馬名0Zero"}, Owner: "オーナー"})
	assert.Error(t, err, "馬名はカタカナのみである必要がある")

	err = h.Create(&v1.HorseDetail{Data: &v1.Horse{Id: 0, Name: "ウ"}, Owner: "オーナー"})
	assert.Error(t, err, "馬名はカタカナ2文字以上である必要がある")

	err = h.Create(&v1.HorseDetail{Data: &v1.Horse{Id: 0, Name: "ウマメイウマメイウマメイ"}, Owner: "オーナー"})
	assert.Error(t, err, "馬名はカタカナ9文字以内である必要がある")
}

func BenchmarkHorseCreate(b *testing.B) {
	h, _ := NewHorseFile(filepath.Join(b.TempDir(), "test"))
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		h.Create(&v1.HorseDetail{Data: &v1.Horse{Id: uint32(i + 1), Name: "ウマメイ"}, Owner: "ああ"})
	}
}
func BenchmarkHorseGetAll(b *testing.B) {
	h, _ := NewHorseFile(filepath.Join(b.TempDir(), "test"))
	for i := 0; i < b.N; i++ {
		h.Create(&v1.HorseDetail{Data: &v1.Horse{Id: uint32(i + 1), Name: "ウマメイ"}, Owner: "ああ"})
	}
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		h.GetAll()
	}
}

func TestAddNewHorse(t *testing.T) {
	h, err := NewHorseFile(filepath.Join(t.TempDir(), "test-new-horse"))
	assert.NotNil(t, h)
	assert.NoError(t, err)

	err = h.Create(&v1.HorseDetail{Data: &v1.Horse{Id: 0, Name: "ワン"}, Owner: "オーナー"})
	assert.NoError(t, err)

	hds, err := h.GetAll()
	assert.Nil(t, err)
	assert.Len(t, hds, 1)
	assert.Equal(t, uint32(1), hds[0].GetData().GetId(), "ID=0で作成したユーザは自動的にIDをインクリメントする")
	assert.Equal(t, "ワン", hds[0].GetData().GetName(), "データが変化しない")

	err = h.Create(&v1.HorseDetail{Data: &v1.Horse{Id: 0, Name: "ワン"}, Owner: "オーナー"})
	assert.NoError(t, err, "同一馬名は弾かない")

	hds, err = h.GetAll()
	assert.NoError(t, err)
	assert.Len(t, hds, 2)

	hd, err := h.GetById(2)
	assert.NoError(t, err)
	assert.Equal(t, uint32(2), hd.GetData().GetId(), "ID=0で作成したユーザは自動的にIDをインクリメントする。またIDで検索できる")
	assert.Equal(t, "ワン", hd.GetData().GetName())

	err = h.Create(&v1.HorseDetail{Data: &v1.Horse{Id: 2, Name: "ツー"}, Owner: "オーナー"})
	assert.Error(t, err, "IDが重複しているときは登録できない")
}
