package store

import v1 "github.com/ueckoken/chofu-race-course/go/_proto/spec/v1"

type User interface {
	GetById(id string) (*v1.User, error)
	Create(u *v1.User) error
}

type Horse interface {
	Create(*v1.HorseDetail) error
	// get Horse data. using `id` as primary key.
	Get(*v1.HorseDataRequest) (*v1.HorseDetail, error)
	GetAll(*v1.HorseDataRequest) ([]*v1.HorseDetail, error)
	Update(*v1.HorseDetail) error
}

