# Protocol Documentation
<a name="top"></a>

## Table of Contents

- [spec/v1/userdata.proto](#spec_v1_userdata-proto)
    - [AllHorseDataRequest](#spec-v1-AllHorseDataRequest)
    - [AllHorseDataResponse](#spec-v1-AllHorseDataResponse)
    - [History](#spec-v1-History)
    - [Horse](#spec-v1-Horse)
    - [HorseDataRequest](#spec-v1-HorseDataRequest)
    - [HorseDataResponse](#spec-v1-HorseDataResponse)
    - [HorseDetail](#spec-v1-HorseDetail)
    - [Member](#spec-v1-Member)
    - [Race](#spec-v1-Race)
    - [RaceDataRequest](#spec-v1-RaceDataRequest)
    - [RaceDataResponse](#spec-v1-RaceDataResponse)
    - [RaceDetail](#spec-v1-RaceDetail)
    - [RangeRaceDataRequest](#spec-v1-RangeRaceDataRequest)
    - [RangeRaceDataResponse](#spec-v1-RangeRaceDataResponse)
    - [Result](#spec-v1-Result)
    - [User](#spec-v1-User)
    - [UserDataRequest](#spec-v1-UserDataRequest)
    - [UserDataResponse](#spec-v1-UserDataResponse)
  
    - [HorseDataService](#spec-v1-HorseDataService)
    - [RaceDataService](#spec-v1-RaceDataService)
    - [UserDataService](#spec-v1-UserDataService)
  
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






<a name="spec-v1-History"></a>

### History
出走履歴のそれぞれ


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| race | [Race](#spec-v1-Race) |  | 出走したレース |
| order | [uint32](#uint32) |  | TODO: 分からん。誰か書いて。 |
| result | [uint32](#uint32) |  | 順位。最も早くゴールしたときに1。 |






<a name="spec-v1-Horse"></a>

### Horse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [uint32](#uint32) |  |  |
| name | [string](#string) |  |  |






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
| name | [string](#string) |  |  |
| owner | [string](#string) |  |  |
| wins | [uint32](#uint32) |  |  |
| matches | [uint32](#uint32) |  |  |
| next | [Race](#spec-v1-Race) | optional |  |
| histories | [History](#spec-v1-History) | repeated |  |






<a name="spec-v1-Member"></a>

### Member



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| order | [uint32](#uint32) |  |  |
| result | [uint32](#uint32) |  |  |
| horse | [Horse](#spec-v1-Horse) |  |  |
| odds | [double](#double) |  |  |
| popularity | [uint32](#uint32) |  |  |






<a name="spec-v1-Race"></a>

### Race



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [uint32](#uint32) |  |  |
| name | [string](#string) |  |  |
| order | [uint32](#uint32) |  |  |
| start | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  |  |






<a name="spec-v1-RaceDataRequest"></a>

### RaceDataRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| race_id | [uint32](#uint32) |  |  |






<a name="spec-v1-RaceDataResponse"></a>

### RaceDataResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| race | [RaceDetail](#spec-v1-RaceDetail) |  |  |






<a name="spec-v1-RaceDetail"></a>

### RaceDetail



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [uint32](#uint32) |  |  |
| name | [string](#string) |  |  |
| description | [string](#string) |  |  |
| order | [uint32](#uint32) |  |  |
| is_finished | [bool](#bool) |  |  |
| member | [Member](#spec-v1-Member) | repeated |  |
| result | [Result](#spec-v1-Result) |  |  |
| start | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  |  |
| vote_begin | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  |  |
| vote_end | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  |  |






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






<a name="spec-v1-Result"></a>

### Result



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| horse | [Horse](#spec-v1-Horse) |  |  |
| order | [uint32](#uint32) |  |  |
| return | [uint32](#uint32) |  |  |






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
| user_id | [string](#string) |  | ユーザID。他のIDはuint32であるが、ユーザIDのみJWTを使う都合上string。 |






<a name="spec-v1-UserDataResponse"></a>

### UserDataResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user | [User](#spec-v1-User) |  |  |





 

 

 


<a name="spec-v1-HorseDataService"></a>

### HorseDataService


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| HorseData | [HorseDataRequest](#spec-v1-HorseDataRequest) | [HorseDataResponse](#spec-v1-HorseDataResponse) |  |
| AllHorseData | [AllHorseDataRequest](#spec-v1-AllHorseDataRequest) | [AllHorseDataResponse](#spec-v1-AllHorseDataResponse) |  |


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
| UserData | [UserDataRequest](#spec-v1-UserDataRequest) | [UserDataResponse](#spec-v1-UserDataResponse) |  |

 



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
