package file

import (
	"errors"
	"os"
)

type NotFound error
type DupricateRecord error

var notFound NotFound = errors.New("record not found")
var recordDupricate DupricateRecord = errors.New("already exist record with your id")

func createFileIfNotExist(path string) error {
	_, err := os.Stat(path)
	if err != nil {
		f, err := os.Create(path)
		if err != nil {
			return err
		}
		defer f.Close()
	}
	return nil
}
