package file_test

import (
	"path"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"
	"github.com/ueckoken/chofu-race-course/go/pkg/file"
	"github.com/ueckoken/chofu-race-course/go/pkg/handler"
)

func TestUserFlow(t *testing.T) {
	u, err := file.NewUserFile(path.Join(t.TempDir(), "user-test"))
	assert.NoError(t, err)
	require.NotNil(t, u)
	assert.Implements(t, (*handler.UserStore)(nil), u)

	res, err := u.GetById("test-1")
	assert.Nil(t, res)
	assert.Error(t, err, "レコードが存在しないときはnotfoundエラー")

	err = u.Create(&v1.User{Id: "test-1"})
	assert.NoError(t, err, "新規登録なので問題なく登録できる")

	err = u.Create(&v1.User{Id: "test-2"})
	assert.NoError(t, err, "新規登録なので問題なく登録できる")

	err = u.Create(&v1.User{Id: "test-1"})
	assert.Error(t, err, "IDが重複しているので新規登録できない")

	res, err = u.GetById("test-1")
	assert.NoError(t, err, "IDが存在しているので取得できる")
	assert.Equal(t, "test-1", res.GetId())

	res, err = u.GetById("存在しないID")
	assert.Error(t, err, "存在しないIDなので引けないでエラーが返ってくる")
	assert.Nil(t, res)
}
