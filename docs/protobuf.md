# Protocol Documentation
<a name="top"></a>

## Table of Contents

- [spec/v1/userdata.proto](#spec_v1_userdata-proto)
    - [AllHorseDataRequest](#spec-v1-AllHorseDataRequest)
    - [AllHorseDataResponse](#spec-v1-AllHorseDataResponse)
    - [CreateUserRequest](#spec-v1-CreateUserRequest)
    - [CreateUserResponse](#spec-v1-CreateUserResponse)
    - [Horse](#spec-v1-Horse)
    - [HorseDataRequest](#spec-v1-HorseDataRequest)
    - [HorseDataResponse](#spec-v1-HorseDataResponse)
    - [HorseDetail](#spec-v1-HorseDetail)
    - [HorseDetail.History](#spec-v1-HorseDetail-History)
    - [Race](#spec-v1-Race)
    - [RaceDataRequest](#spec-v1-RaceDataRequest)
    - [RaceDataResponse](#spec-v1-RaceDataResponse)
    - [RaceDetail](#spec-v1-RaceDetail)
    - [RaceDetail.Member](#spec-v1-RaceDetail-Member)
    - [RangeRaceDataRequest](#spec-v1-RangeRaceDataRequest)
    - [RangeRaceDataResponse](#spec-v1-RangeRaceDataResponse)
    - [RegisterHorseRequest](#spec-v1-RegisterHorseRequest)
    - [RegisterHorseResponse](#spec-v1-RegisterHorseResponse)
    - [User](#spec-v1-User)
    - [UserDataRequest](#spec-v1-UserDataRequest)
    - [UserDataResponse](#spec-v1-UserDataResponse)
    - [VoteRequest](#spec-v1-VoteRequest)
    - [VoteResponse](#spec-v1-VoteResponse)
  
    - [HorseDataService](#spec-v1-HorseDataService)
    - [RaceDataService](#spec-v1-RaceDataService)
    - [UserDataService](#spec-v1-UserDataService)
    - [VoteService](#spec-v1-VoteService)
  
- [Scalar Value Types](#scalar-value-types)



<a name="spec_v1_userdata-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## spec/v1/userdata.proto



<a name="spec-v1-AllHorseDataRequest"></a>

### AllHorseDataRequest







<a name="spec-v1-AllHorseDataResponse"></a>

### AllHorseDataResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| horses | [Horse](#spec-v1-Horse) | repeated |  |






<a name="spec-v1-CreateUserRequest"></a>

### CreateUserRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user | [User](#spec-v1-User) |  |  |






<a name="spec-v1-CreateUserResponse"></a>

### CreateUserResponse







<a name="spec-v1-Horse"></a>

### Horse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [uint32](#uint32) |  |  |
| name | [string](#string) |  | 馬の名前 |






<a name="spec-v1-HorseDataRequest"></a>

### HorseDataRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [uint32](#uint32) |  |  |






<a name="spec-v1-HorseDataResponse"></a>

### HorseDataResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| horse | [HorseDetail](#spec-v1-HorseDetail) |  |  |






<a name="spec-v1-HorseDetail"></a>

### HorseDetail



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [Horse](#spec-v1-Horse) |  |  |
| owner | [string](#string) |  |  |
| wins | [uint32](#uint32) |  | 勝利数 |
| matches | [uint32](#uint32) |  | 試合数 |
| next | [Race](#spec-v1-Race) | optional | 次走、未定ならnull |
| histories | [HorseDetail.History](#spec-v1-HorseDetail-History) | repeated |  |






<a name="spec-v1-HorseDetail-History"></a>

### HorseDetail.History
出走履歴のそれぞれ


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| race | [Race](#spec-v1-Race) |  | 出走したレース |
| order | [uint32](#uint32) |  | その日の何番目のレースか |
| result | [uint32](#uint32) |  | 順位。最も早くゴールしたときに1。 |






<a name="spec-v1-Race"></a>

### Race



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [uint32](#uint32) |  |  |
| name | [string](#string) |  |  |
| order | [uint32](#uint32) |  |  |
| start | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  |  |
| is_finished | [bool](#bool) |  |  |






<a name="spec-v1-RaceDataRequest"></a>

### RaceDataRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [uint32](#uint32) |  |  |






<a name="spec-v1-RaceDataResponse"></a>

### RaceDataResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| race | [RaceDetail](#spec-v1-RaceDetail) |  |  |






<a name="spec-v1-RaceDetail"></a>

### RaceDetail



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [Race](#spec-v1-Race) |  |  |
| description | [string](#string) |  |  |
| members | [RaceDetail.Member](#spec-v1-RaceDetail-Member) | repeated |  |
| vote_begin | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  |  |
| vote_end | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  |  |






<a name="spec-v1-RaceDetail-Member"></a>

### RaceDetail.Member



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| order | [uint32](#uint32) |  |  |
| horse | [Horse](#spec-v1-Horse) |  |  |
| odds | [double](#double) |  |  |
| popularity | [uint32](#uint32) |  |  |






<a name="spec-v1-RangeRaceDataRequest"></a>

### RangeRaceDataRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| begin | [google.protobuf.Timestamp](#google-protobuf-Timestamp) | optional | 指定した時間を含む、指定した時間からのデータを取得する。指定しなかったときは0(=1970年1月1日)と見なす。 |
| end | [google.protobuf.Timestamp](#google-protobuf-Timestamp) | optional | 指定した時間を含む、指定した時間までのデータを取得する。指定しなかったときは取得できる最新まで取得する。 |






<a name="spec-v1-RangeRaceDataResponse"></a>

### RangeRaceDataResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| races | [Race](#spec-v1-Race) | repeated |  |






<a name="spec-v1-RegisterHorseRequest"></a>

### RegisterHorseRequest
HorseDetailの初期値 id: id&#43;&#43;, wins; 0, matches: 0, next: null, histories: []


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  |  |
| owner | [string](#string) |  |  |






<a name="spec-v1-RegisterHorseResponse"></a>

### RegisterHorseResponse







<a name="spec-v1-User"></a>

### User
ユーザを表現する型


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | ユーザID。他のIDはuint32であるが、ユーザIDのみJWTを使う都合上string。 |






<a name="spec-v1-UserDataRequest"></a>

### UserDataRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | ユーザID。他のIDはuint32であるが、ユーザIDのみJWTを使う都合上string。 |






<a name="spec-v1-UserDataResponse"></a>

### UserDataResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user | [User](#spec-v1-User) |  |  |






<a name="spec-v1-VoteRequest"></a>

### VoteRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| race | [uint32](#uint32) |  | 投票するレースのID |
| horse | [uint32](#uint32) |  | 投票する馬の馬番 |






<a name="spec-v1-VoteResponse"></a>

### VoteResponse






 

 

 


<a name="spec-v1-HorseDataService"></a>

### HorseDataService


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| HorseData | [HorseDataRequest](#spec-v1-HorseDataRequest) | [HorseDataResponse](#spec-v1-HorseDataResponse) |  |
| AllHorseData | [AllHorseDataRequest](#spec-v1-AllHorseDataRequest) | [AllHorseDataResponse](#spec-v1-AllHorseDataResponse) |  |
| RegisterHorse | [RegisterHorseRequest](#spec-v1-RegisterHorseRequest) | [RegisterHorseResponse](#spec-v1-RegisterHorseResponse) |  |


<a name="spec-v1-RaceDataService"></a>

### RaceDataService


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| RangeRaceData | [RangeRaceDataRequest](#spec-v1-RangeRaceDataRequest) | [RangeRaceDataResponse](#spec-v1-RangeRaceDataResponse) |  |
| RaceData | [RaceDataRequest](#spec-v1-RaceDataRequest) | [RaceDataResponse](#spec-v1-RaceDataResponse) |  |


<a name="spec-v1-UserDataService"></a>

### UserDataService
ユーザのデータをやり取りするサービス

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| UserData | [UserDataRequest](#spec-v1-UserDataRequest) | [UserDataResponse](#spec-v1-UserDataResponse) | UserIdからUser情報を取得する |
| CreateUser | [CreateUserRequest](#spec-v1-CreateUserRequest) | [CreateUserResponse](#spec-v1-CreateUserResponse) | 新規Userを作成する |


<a name="spec-v1-VoteService"></a>

### VoteService


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| Vote | [VoteRequest](#spec-v1-VoteRequest) | [VoteResponse](#spec-v1-VoteResponse) |  |

 



## Scalar Value Types

| .proto Type | Notes | C++ | Java | Python | Go | C# | PHP | Ruby |
| ----------- | ----- | --- | ---- | ------ | -- | -- | --- | ---- |
| <a name="double" /> double |  | double | double | float | float64 | double | float | Float |
| <a name="float" /> float |  | float | float | float | float32 | float | float | Float |
| <a name="int32" /> int32 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint32 instead. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="int64" /> int64 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint64 instead. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="uint32" /> uint32 | Uses variable-length encoding. | uint32 | int | int/long | uint32 | uint | integer | Bignum or Fixnum (as required) |
| <a name="uint64" /> uint64 | Uses variable-length encoding. | uint64 | long | int/long | uint64 | ulong | integer/string | Bignum or Fixnum (as required) |
| <a name="sint32" /> sint32 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int32s. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="sint64" /> sint64 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int64s. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="fixed32" /> fixed32 | Always four bytes. More efficient than uint32 if values are often greater than 2^28. | uint32 | int | int | uint32 | uint | integer | Bignum or Fixnum (as required) |
| <a name="fixed64" /> fixed64 | Always eight bytes. More efficient than uint64 if values are often greater than 2^56. | uint64 | long | int/long | uint64 | ulong | integer/string | Bignum |
| <a name="sfixed32" /> sfixed32 | Always four bytes. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="sfixed64" /> sfixed64 | Always eight bytes. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="bool" /> bool |  | bool | boolean | boolean | bool | bool | boolean | TrueClass/FalseClass |
| <a name="string" /> string | A string must always contain UTF-8 encoded or 7-bit ASCII text. | string | String | str/unicode | string | string | string | String (UTF-8) |
| <a name="bytes" /> bytes | May contain any arbitrary sequence of bytes. | string | ByteString | str | []byte | ByteString | string | String (ASCII-8BIT) |

