.PHONY: go

all:
	docker compose up --build 
backend:
	docker compose up --build backend
