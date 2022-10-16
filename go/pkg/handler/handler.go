package handler

type DataStore struct {
	Horse HorseStore
	Race  RaceStore
	User  UserStore
}
