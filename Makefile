.PHONY: all
all:
	docker compose up --build 
.PHONY: backend
backend:
	docker compose up --build backend volume-owner
testdata:
	go run ./cmd/regist/main.go horse -endpoint http://localhost:8080 -password password -owner オーナー名 -horse 馬名
