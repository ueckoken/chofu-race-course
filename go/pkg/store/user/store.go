package user

import v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"

type User interface {
	Create(*v1.User) error
	GetById(id string) (*v1.User, error)
	Delete(*v1.User) error
}
