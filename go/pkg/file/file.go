package file

import (
	"errors"
	"os"
)

type NotFound error

var notFound NotFound = errors.New("record not found")

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
