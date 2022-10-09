package file

import (
	"errors"
)

type NotFound error
type DupricateRecord error

var notFound NotFound = errors.New("record not found")
var recordDupricate DupricateRecord = errors.New("already exist record with your id")
