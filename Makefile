.PHONY: all
all:
	docker compose up --build 
.PHONY: backend
backend:
	docker compose up --build backend volume-owner
buf:
	buf generate --path=./proto/spec
