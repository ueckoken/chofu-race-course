package file

import (
	"errors"
)

type NotFound error
type DupricateRecord error

var errNotFound NotFound = errors.New("record not found")
var errRecordDupricate DupricateRecord = errors.New("already exist record with your id")
