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

func TestAddNewHorse(t *testing.T) {
	h, err := NewHorseFile(filepath.Join(t.TempDir(), "test-new-horse"))
	assert.NotNil(t, h)
	assert.Nil(t, err)
	err = h.Create(&v1.HorseDetail{Data: &v1.Horse{Id: 0, Name: "テスト1"}})
	assert.Nil(t, err)

	hds, err := h.GetAll()
	assert.Nil(t, err)
	assert.Len(t, hds, 1)
	assert.Equal(t, &v1.HorseDetail{Data: &v1.Horse{Id: 1, Name: "テスト1"}}, hds[0], "ID=0で作成したユーザは自動的にIDをインクリメントする")

	err = h.Create(&v1.HorseDetail{Data: &v1.Horse{Id: 0, Name: "テスト2"}})
	assert.Nil(t, err)

	hds, err = h.GetAll()
	assert.Nil(t, err)
	assert.Len(t, hds, 2)

	hd, err := h.GetById(2)
	assert.Nil(t, err)
	assert.Equal(t, &v1.HorseDetail{Data: &v1.Horse{Id: 2, Name: "テスト2"}}, hd, "ID=0で作成したユーザは自動的にIDをインクリメントする。またIDで検索できる")

}
