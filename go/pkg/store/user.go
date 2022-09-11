package store

import v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"

type User interface {
	GetById(id string) (*v1.User, error)
}
