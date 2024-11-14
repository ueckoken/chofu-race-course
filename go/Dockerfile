FROM golang:1.23 AS builder

WORKDIR /app
ENV CGO_ENABLED=0

COPY go.mod go.sum ./
RUN go mod download

COPY . ./
RUN go build -o app ./

FROM gcr.io/distroless/static-debian11:nonroot AS runner
# FROM gcr.io/distroless/static-debian11:debug-nonroot AS runner
COPY --from=builder --chown=nonroot:nonroot /app/app /app
ENTRYPOINT ["/app"]
