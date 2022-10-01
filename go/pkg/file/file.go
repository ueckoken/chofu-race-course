package file

import "errors"

type NotFound error

var notFound NotFound = errors.New("record not found")

