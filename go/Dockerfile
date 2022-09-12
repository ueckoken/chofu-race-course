FROM golang:1.19 as builder

WORKDIR /app
ENV CGO_ENABLED=0

COPY go.mod go.sum ./
RUN go mod download

COPY . ./
RUN go build -o app ./

FROM gcr.io/distroless/static-debian11:nonroot

COPY --from=builder /app/app /app
CMD ["/app"]
