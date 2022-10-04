# chofu-race-course

## 最初に

本プロジェクトでは次のソフトウェアを要求します。

- Docker
- go
- yarn v2
- gnu make

また optional ですが [`buf`](https://buf.build/)を入れておくと Protobuf からコードを生成するときに使えます。

## テストデータの入れかた

ルートディレクトリで `make`を叩いてください。Docker Compose にてサーバ用ソフトウェアとフロントサイトをビルドします。

次に別ターミナルを開いて、ルートディレクトリで `make data-add`を叩いて下さい。テスト用のデータをデータベースに登録します。

