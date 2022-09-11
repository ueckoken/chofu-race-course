// @generated by protoc-gen-es v0.1.1 with parameter "target=ts"
// @generated from file spec/v1/userdata.proto (package spec.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3, Timestamp} from "@bufbuild/protobuf";

/**
 * ユーザを表現する型
 *
 * @generated from message spec.v1.User
 */
export class User extends Message<User> {
  /**
   * ユーザID。他のIDはuint32であるが、ユーザIDのみJWTを使う都合上string。
   *
   * @generated from field: string id = 1;
   */
  id = "";

  constructor(data?: PartialMessage<User>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.v1.User";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): User {
    return new User().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): User {
    return new User().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): User {
    return new User().fromJsonString(jsonString, options);
  }

  static equals(a: User | PlainMessage<User> | undefined, b: User | PlainMessage<User> | undefined): boolean {
    return proto3.util.equals(User, a, b);
  }
}

/**
 * @generated from message spec.v1.UserDataRequest
 */
export class UserDataRequest extends Message<UserDataRequest> {
  /**
   * ユーザID。他のIDはuint32であるが、ユーザIDのみJWTを使う都合上string。
   *
   * @generated from field: string id = 1;
   */
  id = "";

  constructor(data?: PartialMessage<UserDataRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.v1.UserDataRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UserDataRequest {
    return new UserDataRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UserDataRequest {
    return new UserDataRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UserDataRequest {
    return new UserDataRequest().fromJsonString(jsonString, options);
  }

  static equals(a: UserDataRequest | PlainMessage<UserDataRequest> | undefined, b: UserDataRequest | PlainMessage<UserDataRequest> | undefined): boolean {
    return proto3.util.equals(UserDataRequest, a, b);
  }
}

/**
 * @generated from message spec.v1.UserDataResponse
 */
export class UserDataResponse extends Message<UserDataResponse> {
  /**
   * @generated from field: spec.v1.User user = 1;
   */
  user?: User;

  constructor(data?: PartialMessage<UserDataResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.v1.UserDataResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "user", kind: "message", T: User },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UserDataResponse {
    return new UserDataResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UserDataResponse {
    return new UserDataResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UserDataResponse {
    return new UserDataResponse().fromJsonString(jsonString, options);
  }

  static equals(a: UserDataResponse | PlainMessage<UserDataResponse> | undefined, b: UserDataResponse | PlainMessage<UserDataResponse> | undefined): boolean {
    return proto3.util.equals(UserDataResponse, a, b);
  }
}

/**
 * @generated from message spec.v1.CreateUserRequest
 */
export class CreateUserRequest extends Message<CreateUserRequest> {
  /**
   * @generated from field: spec.v1.User user = 1;
   */
  user?: User;

  constructor(data?: PartialMessage<CreateUserRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.v1.CreateUserRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "user", kind: "message", T: User },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateUserRequest {
    return new CreateUserRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateUserRequest {
    return new CreateUserRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateUserRequest {
    return new CreateUserRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CreateUserRequest | PlainMessage<CreateUserRequest> | undefined, b: CreateUserRequest | PlainMessage<CreateUserRequest> | undefined): boolean {
    return proto3.util.equals(CreateUserRequest, a, b);
  }
}

/**
 * @generated from message spec.v1.CreateUserResponse
 */
export class CreateUserResponse extends Message<CreateUserResponse> {
  constructor(data?: PartialMessage<CreateUserResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.v1.CreateUserResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateUserResponse {
    return new CreateUserResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateUserResponse {
    return new CreateUserResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateUserResponse {
    return new CreateUserResponse().fromJsonString(jsonString, options);
  }

  static equals(a: CreateUserResponse | PlainMessage<CreateUserResponse> | undefined, b: CreateUserResponse | PlainMessage<CreateUserResponse> | undefined): boolean {
    return proto3.util.equals(CreateUserResponse, a, b);
  }
}

/**
 * @generated from message spec.v1.Horse
 */
export class Horse extends Message<Horse> {
  /**
   * @generated from field: uint32 id = 1;
   */
  id = 0;

  /**
   * 馬の名前
   *
   * @generated from field: string name = 2;
   */
  name = "";

  constructor(data?: PartialMessage<Horse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.v1.Horse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Horse {
    return new Horse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Horse {
    return new Horse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Horse {
    return new Horse().fromJsonString(jsonString, options);
  }

  static equals(a: Horse | PlainMessage<Horse> | undefined, b: Horse | PlainMessage<Horse> | undefined): boolean {
    return proto3.util.equals(Horse, a, b);
  }
}

/**
 * 出走履歴のそれぞれのレコード
 *
 * @generated from message spec.v1.History
 */
export class History extends Message<History> {
  /**
   * 出走したレース
   *
   * @generated from field: spec.v1.Race race = 1;
   */
  race?: Race;

  /**
   * TODO: 分からん。誰か書いて。
   *
   * @generated from field: uint32 order = 2;
   */
  order = 0;

  /**
   * 順位。最も早くゴールしたときに1。
   *
   * @generated from field: uint32 result = 3;
   */
  result = 0;

  constructor(data?: PartialMessage<History>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.v1.History";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "race", kind: "message", T: Race },
    { no: 2, name: "order", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 3, name: "result", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): History {
    return new History().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): History {
    return new History().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): History {
    return new History().fromJsonString(jsonString, options);
  }

  static equals(a: History | PlainMessage<History> | undefined, b: History | PlainMessage<History> | undefined): boolean {
    return proto3.util.equals(History, a, b);
  }
}

/**
 * @generated from message spec.v1.HorseDetail
 */
export class HorseDetail extends Message<HorseDetail> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: string owner = 2;
   */
  owner = "";

  /**
   * 勝利数
   *
   * @generated from field: uint32 wins = 3;
   */
  wins = 0;

  /**
   * 試合数
   *
   * @generated from field: uint32 matches = 4;
   */
  matches = 0;

  /**
   * 次走、未定ならnull
   *
   * @generated from field: optional spec.v1.Race next = 5;
   */
  next?: Race;

  /**
   * @generated from field: repeated spec.v1.HorseDetail.History histories = 6;
   */
  histories: HorseDetail_History[] = [];

  constructor(data?: PartialMessage<HorseDetail>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.v1.HorseDetail";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "owner", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "wins", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 4, name: "matches", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 5, name: "next", kind: "message", T: Race, opt: true },
    { no: 6, name: "histories", kind: "message", T: HorseDetail_History, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): HorseDetail {
    return new HorseDetail().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): HorseDetail {
    return new HorseDetail().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): HorseDetail {
    return new HorseDetail().fromJsonString(jsonString, options);
  }

  static equals(a: HorseDetail | PlainMessage<HorseDetail> | undefined, b: HorseDetail | PlainMessage<HorseDetail> | undefined): boolean {
    return proto3.util.equals(HorseDetail, a, b);
  }
}

/**
 * 出走履歴のそれぞれ
 *
 * @generated from message spec.v1.HorseDetail.History
 */
export class HorseDetail_History extends Message<HorseDetail_History> {
  /**
   * 出走したレース
   *
   * @generated from field: spec.v1.Race race = 1;
   */
  race?: Race;

  /**
   * その日の何番目のレースか
   *
   * @generated from field: uint32 order = 2;
   */
  order = 0;

  /**
   * 順位。最も早くゴールしたときに1。
   *
   * @generated from field: uint32 result = 3;
   */
  result = 0;

  constructor(data?: PartialMessage<HorseDetail_History>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.v1.HorseDetail.History";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "race", kind: "message", T: Race },
    { no: 2, name: "order", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 3, name: "result", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): HorseDetail_History {
    return new HorseDetail_History().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): HorseDetail_History {
    return new HorseDetail_History().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): HorseDetail_History {
    return new HorseDetail_History().fromJsonString(jsonString, options);
  }

  static equals(a: HorseDetail_History | PlainMessage<HorseDetail_History> | undefined, b: HorseDetail_History | PlainMessage<HorseDetail_History> | undefined): boolean {
    return proto3.util.equals(HorseDetail_History, a, b);
  }
}

/**
 * @generated from message spec.v1.HorseDataRequest
 */
export class HorseDataRequest extends Message<HorseDataRequest> {
  /**
   * @generated from field: uint32 id = 1;
   */
  id = 0;

  constructor(data?: PartialMessage<HorseDataRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.v1.HorseDataRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): HorseDataRequest {
    return new HorseDataRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): HorseDataRequest {
    return new HorseDataRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): HorseDataRequest {
    return new HorseDataRequest().fromJsonString(jsonString, options);
  }

  static equals(a: HorseDataRequest | PlainMessage<HorseDataRequest> | undefined, b: HorseDataRequest | PlainMessage<HorseDataRequest> | undefined): boolean {
    return proto3.util.equals(HorseDataRequest, a, b);
  }
}

/**
 * @generated from message spec.v1.HorseDataResponse
 */
export class HorseDataResponse extends Message<HorseDataResponse> {
  /**
   * @generated from field: spec.v1.HorseDetail horse = 1;
   */
  horse?: HorseDetail;

  constructor(data?: PartialMessage<HorseDataResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.v1.HorseDataResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "horse", kind: "message", T: HorseDetail },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): HorseDataResponse {
    return new HorseDataResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): HorseDataResponse {
    return new HorseDataResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): HorseDataResponse {
    return new HorseDataResponse().fromJsonString(jsonString, options);
  }

  static equals(a: HorseDataResponse | PlainMessage<HorseDataResponse> | undefined, b: HorseDataResponse | PlainMessage<HorseDataResponse> | undefined): boolean {
    return proto3.util.equals(HorseDataResponse, a, b);
  }
}

/**
 * @generated from message spec.v1.AllHorseDataRequest
 */
export class AllHorseDataRequest extends Message<AllHorseDataRequest> {
  constructor(data?: PartialMessage<AllHorseDataRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.v1.AllHorseDataRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AllHorseDataRequest {
    return new AllHorseDataRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AllHorseDataRequest {
    return new AllHorseDataRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AllHorseDataRequest {
    return new AllHorseDataRequest().fromJsonString(jsonString, options);
  }

  static equals(a: AllHorseDataRequest | PlainMessage<AllHorseDataRequest> | undefined, b: AllHorseDataRequest | PlainMessage<AllHorseDataRequest> | undefined): boolean {
    return proto3.util.equals(AllHorseDataRequest, a, b);
  }
}

/**
 * @generated from message spec.v1.AllHorseDataResponse
 */
export class AllHorseDataResponse extends Message<AllHorseDataResponse> {
  /**
   * @generated from field: repeated spec.v1.Horse horses = 1;
   */
  horses: Horse[] = [];

  constructor(data?: PartialMessage<AllHorseDataResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.v1.AllHorseDataResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "horses", kind: "message", T: Horse, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AllHorseDataResponse {
    return new AllHorseDataResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AllHorseDataResponse {
    return new AllHorseDataResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AllHorseDataResponse {
    return new AllHorseDataResponse().fromJsonString(jsonString, options);
  }

  static equals(a: AllHorseDataResponse | PlainMessage<AllHorseDataResponse> | undefined, b: AllHorseDataResponse | PlainMessage<AllHorseDataResponse> | undefined): boolean {
    return proto3.util.equals(AllHorseDataResponse, a, b);
  }
}

/**
 * @generated from message spec.v1.Race
 */
export class Race extends Message<Race> {
  /**
   * @generated from field: uint32 id = 1;
   */
  id = 0;

  /**
   * @generated from field: string name = 2;
   */
  name = "";

  /**
   * @generated from field: uint32 order = 3;
   */
  order = 0;

  /**
   * @generated from field: google.protobuf.Timestamp start = 4;
   */
  start?: Timestamp;

  /**
   * @generated from field: bool is_finished = 5;
   */
  isFinished = false;

  constructor(data?: PartialMessage<Race>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.v1.Race";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "order", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 4, name: "start", kind: "message", T: Timestamp },
    { no: 5, name: "is_finished", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Race {
    return new Race().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Race {
    return new Race().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Race {
    return new Race().fromJsonString(jsonString, options);
  }

  static equals(a: Race | PlainMessage<Race> | undefined, b: Race | PlainMessage<Race> | undefined): boolean {
    return proto3.util.equals(Race, a, b);
  }
}

/**
 * @generated from message spec.v1.RaceDetail
 */
export class RaceDetail extends Message<RaceDetail> {
  /**
   * @generated from field: uint32 id = 1;
   */
  id = 0;

  /**
   * @generated from field: string name = 2;
   */
  name = "";

  /**
   * @generated from field: string description = 3;
   */
  description = "";

  /**
   * @generated from field: uint32 order = 4;
   */
  order = 0;

  /**
   * @generated from field: repeated spec.v1.RaceDetail.Member members = 5;
   */
  members: RaceDetail_Member[] = [];

  /**
   * @generated from field: google.protobuf.Timestamp start = 6;
   */
  start?: Timestamp;

  /**
   * @generated from field: google.protobuf.Timestamp vote_begin = 7;
   */
  voteBegin?: Timestamp;

  /**
   * @generated from field: google.protobuf.Timestamp vote_end = 8;
   */
  voteEnd?: Timestamp;

  constructor(data?: PartialMessage<RaceDetail>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.v1.RaceDetail";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "order", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 5, name: "members", kind: "message", T: RaceDetail_Member, repeated: true },
    { no: 6, name: "start", kind: "message", T: Timestamp },
    { no: 7, name: "vote_begin", kind: "message", T: Timestamp },
    { no: 8, name: "vote_end", kind: "message", T: Timestamp },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RaceDetail {
    return new RaceDetail().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RaceDetail {
    return new RaceDetail().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RaceDetail {
    return new RaceDetail().fromJsonString(jsonString, options);
  }

  static equals(a: RaceDetail | PlainMessage<RaceDetail> | undefined, b: RaceDetail | PlainMessage<RaceDetail> | undefined): boolean {
    return proto3.util.equals(RaceDetail, a, b);
  }
}

/**
 * @generated from message spec.v1.RaceDetail.Member
 */
export class RaceDetail_Member extends Message<RaceDetail_Member> {
  /**
   * @generated from field: uint32 order = 1;
   */
  order = 0;

  /**
   * @generated from field: spec.v1.Horse horse = 2;
   */
  horse?: Horse;

  /**
   * @generated from field: double odds = 3;
   */
  odds = 0;

  /**
   * @generated from field: uint32 popularity = 4;
   */
  popularity = 0;

  constructor(data?: PartialMessage<RaceDetail_Member>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.v1.RaceDetail.Member";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "order", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 2, name: "horse", kind: "message", T: Horse },
    { no: 3, name: "odds", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 4, name: "popularity", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RaceDetail_Member {
    return new RaceDetail_Member().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RaceDetail_Member {
    return new RaceDetail_Member().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RaceDetail_Member {
    return new RaceDetail_Member().fromJsonString(jsonString, options);
  }

  static equals(a: RaceDetail_Member | PlainMessage<RaceDetail_Member> | undefined, b: RaceDetail_Member | PlainMessage<RaceDetail_Member> | undefined): boolean {
    return proto3.util.equals(RaceDetail_Member, a, b);
  }
}

/**
 * @generated from message spec.v1.RaceDataRequest
 */
export class RaceDataRequest extends Message<RaceDataRequest> {
  /**
   * @generated from field: uint32 id = 1;
   */
  id = 0;

  constructor(data?: PartialMessage<RaceDataRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.v1.RaceDataRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RaceDataRequest {
    return new RaceDataRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RaceDataRequest {
    return new RaceDataRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RaceDataRequest {
    return new RaceDataRequest().fromJsonString(jsonString, options);
  }

  static equals(a: RaceDataRequest | PlainMessage<RaceDataRequest> | undefined, b: RaceDataRequest | PlainMessage<RaceDataRequest> | undefined): boolean {
    return proto3.util.equals(RaceDataRequest, a, b);
  }
}

/**
 * @generated from message spec.v1.RaceDataResponse
 */
export class RaceDataResponse extends Message<RaceDataResponse> {
  /**
   * @generated from field: spec.v1.RaceDetail race = 1;
   */
  race?: RaceDetail;

  constructor(data?: PartialMessage<RaceDataResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.v1.RaceDataResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "race", kind: "message", T: RaceDetail },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RaceDataResponse {
    return new RaceDataResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RaceDataResponse {
    return new RaceDataResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RaceDataResponse {
    return new RaceDataResponse().fromJsonString(jsonString, options);
  }

  static equals(a: RaceDataResponse | PlainMessage<RaceDataResponse> | undefined, b: RaceDataResponse | PlainMessage<RaceDataResponse> | undefined): boolean {
    return proto3.util.equals(RaceDataResponse, a, b);
  }
}

/**
 * @generated from message spec.v1.RangeRaceDataRequest
 */
export class RangeRaceDataRequest extends Message<RangeRaceDataRequest> {
  /**
   * 指定した時間を含む、指定した時間からのデータを取得する。指定しなかったときは0(=1970年1月1日)と見なす。
   *
   * @generated from field: optional google.protobuf.Timestamp begin = 1;
   */
  begin?: Timestamp;

  /**
   * 指定した時間を含む、指定した時間までのデータを取得する。指定しなかったときは取得できる最新まで取得する。
   *
   * @generated from field: optional google.protobuf.Timestamp end = 2;
   */
  end?: Timestamp;

  constructor(data?: PartialMessage<RangeRaceDataRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.v1.RangeRaceDataRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "begin", kind: "message", T: Timestamp, opt: true },
    { no: 2, name: "end", kind: "message", T: Timestamp, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RangeRaceDataRequest {
    return new RangeRaceDataRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RangeRaceDataRequest {
    return new RangeRaceDataRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RangeRaceDataRequest {
    return new RangeRaceDataRequest().fromJsonString(jsonString, options);
  }

  static equals(a: RangeRaceDataRequest | PlainMessage<RangeRaceDataRequest> | undefined, b: RangeRaceDataRequest | PlainMessage<RangeRaceDataRequest> | undefined): boolean {
    return proto3.util.equals(RangeRaceDataRequest, a, b);
  }
}

/**
 * @generated from message spec.v1.RangeRaceDataResponse
 */
export class RangeRaceDataResponse extends Message<RangeRaceDataResponse> {
  /**
   * @generated from field: repeated spec.v1.Race races = 1;
   */
  races: Race[] = [];

  constructor(data?: PartialMessage<RangeRaceDataResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.v1.RangeRaceDataResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "races", kind: "message", T: Race, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RangeRaceDataResponse {
    return new RangeRaceDataResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RangeRaceDataResponse {
    return new RangeRaceDataResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RangeRaceDataResponse {
    return new RangeRaceDataResponse().fromJsonString(jsonString, options);
  }

  static equals(a: RangeRaceDataResponse | PlainMessage<RangeRaceDataResponse> | undefined, b: RangeRaceDataResponse | PlainMessage<RangeRaceDataResponse> | undefined): boolean {
    return proto3.util.equals(RangeRaceDataResponse, a, b);
  }
}

/**
 * @generated from message spec.v1.VoteRequest
 */
export class VoteRequest extends Message<VoteRequest> {
  /**
   * 投票するレースのID
   *
   * @generated from field: uint32 race = 1;
   */
  race = 0;

  /**
   * 投票する馬の馬番
   *
   * @generated from field: uint32 horse = 2;
   */
  horse = 0;

  constructor(data?: PartialMessage<VoteRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.v1.VoteRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "race", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 2, name: "horse", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): VoteRequest {
    return new VoteRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): VoteRequest {
    return new VoteRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): VoteRequest {
    return new VoteRequest().fromJsonString(jsonString, options);
  }

  static equals(a: VoteRequest | PlainMessage<VoteRequest> | undefined, b: VoteRequest | PlainMessage<VoteRequest> | undefined): boolean {
    return proto3.util.equals(VoteRequest, a, b);
  }
}

/**
 * @generated from message spec.v1.VoteResponse
 */
export class VoteResponse extends Message<VoteResponse> {
  constructor(data?: PartialMessage<VoteResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.v1.VoteResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): VoteResponse {
    return new VoteResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): VoteResponse {
    return new VoteResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): VoteResponse {
    return new VoteResponse().fromJsonString(jsonString, options);
  }

  static equals(a: VoteResponse | PlainMessage<VoteResponse> | undefined, b: VoteResponse | PlainMessage<VoteResponse> | undefined): boolean {
    return proto3.util.equals(VoteResponse, a, b);
  }
}

