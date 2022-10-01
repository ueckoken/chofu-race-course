// @generated by protoc-gen-es v0.1.1 with parameter "target=js+dts"
// @generated from file spec/v1/userdata.proto (package spec.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage, Timestamp} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * ユーザを表現する型
 *
 * @generated from message spec.v1.User
 */
export declare class User extends Message<User> {
  /**
   * ユーザID。他のIDはuint32であるが、ユーザIDのみJWTを使う都合上string。
   *
   * @generated from field: string id = 1;
   */
  id: string;

  constructor(data?: PartialMessage<User>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.User";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): User;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): User;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): User;

  static equals(a: User | PlainMessage<User> | undefined, b: User | PlainMessage<User> | undefined): boolean;
}

/**
 * @generated from message spec.v1.UserDataRequest
 */
export declare class UserDataRequest extends Message<UserDataRequest> {
  /**
   * @generated from field: spec.v1.JWT jwt = 1;
   */
  jwt?: JWT;

  constructor(data?: PartialMessage<UserDataRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.UserDataRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UserDataRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UserDataRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UserDataRequest;

  static equals(a: UserDataRequest | PlainMessage<UserDataRequest> | undefined, b: UserDataRequest | PlainMessage<UserDataRequest> | undefined): boolean;
}

/**
 * JWTトークン
 *
 * @generated from message spec.v1.JWT
 */
export declare class JWT extends Message<JWT> {
  /**
   * @generated from field: string token = 1;
   */
  token: string;

  constructor(data?: PartialMessage<JWT>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.JWT";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): JWT;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): JWT;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): JWT;

  static equals(a: JWT | PlainMessage<JWT> | undefined, b: JWT | PlainMessage<JWT> | undefined): boolean;
}

/**
 * @generated from message spec.v1.UserDataResponse
 */
export declare class UserDataResponse extends Message<UserDataResponse> {
  /**
   * @generated from field: spec.v1.User user = 1;
   */
  user?: User;

  constructor(data?: PartialMessage<UserDataResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.UserDataResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UserDataResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UserDataResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UserDataResponse;

  static equals(a: UserDataResponse | PlainMessage<UserDataResponse> | undefined, b: UserDataResponse | PlainMessage<UserDataResponse> | undefined): boolean;
}

/**
 * @generated from message spec.v1.CreateUserRequest
 */
export declare class CreateUserRequest extends Message<CreateUserRequest> {
  /**
   * @generated from field: spec.v1.User user = 1 [deprecated = true];
   * @deprecated
   */
  user?: User;

  constructor(data?: PartialMessage<CreateUserRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.CreateUserRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateUserRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateUserRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateUserRequest;

  static equals(a: CreateUserRequest | PlainMessage<CreateUserRequest> | undefined, b: CreateUserRequest | PlainMessage<CreateUserRequest> | undefined): boolean;
}

/**
 * @generated from message spec.v1.CreateUserResponse
 */
export declare class CreateUserResponse extends Message<CreateUserResponse> {
  /**
   * @generated from field: spec.v1.User user = 1;
   */
  user?: User;

  /**
   * @generated from field: spec.v1.JWT jwt = 2;
   */
  jwt?: JWT;

  constructor(data?: PartialMessage<CreateUserResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.CreateUserResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateUserResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateUserResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateUserResponse;

  static equals(a: CreateUserResponse | PlainMessage<CreateUserResponse> | undefined, b: CreateUserResponse | PlainMessage<CreateUserResponse> | undefined): boolean;
}

/**
 * @generated from message spec.v1.Horse
 */
export declare class Horse extends Message<Horse> {
  /**
   * @generated from field: uint32 id = 1;
   */
  id: number;

  /**
   * 馬の名前
   *
   * @generated from field: string name = 2;
   */
  name: string;

  constructor(data?: PartialMessage<Horse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.Horse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Horse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Horse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Horse;

  static equals(a: Horse | PlainMessage<Horse> | undefined, b: Horse | PlainMessage<Horse> | undefined): boolean;
}

/**
 * @generated from message spec.v1.HorseDetail
 */
export declare class HorseDetail extends Message<HorseDetail> {
  /**
   * @generated from field: spec.v1.Horse data = 1;
   */
  data?: Horse;

  /**
   * @generated from field: string owner = 2;
   */
  owner: string;

  /**
   * @generated from field: optional spec.v1.HorseDetail.Image image = 3;
   */
  image?: HorseDetail_Image;

  /**
   * 勝利数
   *
   * @generated from field: uint32 wins = 4;
   */
  wins: number;

  /**
   * 試合数
   *
   * @generated from field: uint32 matches = 5;
   */
  matches: number;

  /**
   * 次走、未定ならnull
   *
   * @generated from field: optional spec.v1.Race next = 6;
   */
  next?: Race;

  /**
   * @generated from field: repeated spec.v1.HorseDetail.History histories = 7;
   */
  histories: HorseDetail_History[];

  constructor(data?: PartialMessage<HorseDetail>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.HorseDetail";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): HorseDetail;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): HorseDetail;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): HorseDetail;

  static equals(a: HorseDetail | PlainMessage<HorseDetail> | undefined, b: HorseDetail | PlainMessage<HorseDetail> | undefined): boolean;
}

/**
 * @generated from message spec.v1.HorseDetail.Image
 */
export declare class HorseDetail_Image extends Message<HorseDetail_Image> {
  /**
   * 拡張子
   *
   * @generated from field: spec.v1.HorseDetail.Image.ImageType type = 1;
   */
  type: HorseDetail_Image_ImageType;

  /**
   * base64形式
   *
   * @generated from field: bytes data = 2;
   */
  data: Uint8Array;

  constructor(data?: PartialMessage<HorseDetail_Image>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.HorseDetail.Image";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): HorseDetail_Image;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): HorseDetail_Image;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): HorseDetail_Image;

  static equals(a: HorseDetail_Image | PlainMessage<HorseDetail_Image> | undefined, b: HorseDetail_Image | PlainMessage<HorseDetail_Image> | undefined): boolean;
}

/**
 * @generated from enum spec.v1.HorseDetail.Image.ImageType
 */
export declare enum HorseDetail_Image_ImageType {
  /**
   * @generated from enum value: IMAGE_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: IMAGE_TYPE_PNG = 1;
   */
  PNG = 1,

  /**
   * @generated from enum value: IMAGE_TYPE_JPEG = 2;
   */
  JPEG = 2,

  /**
   * @generated from enum value: IMAGE_TYPE_GIF = 3;
   */
  GIF = 3,
}

/**
 * 出走履歴のそれぞれ
 *
 * @generated from message spec.v1.HorseDetail.History
 */
export declare class HorseDetail_History extends Message<HorseDetail_History> {
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
  order: number;

  /**
   * 順位
   *
   * @generated from field: spec.v1.RaceOrder result = 3;
   */
  result?: RaceOrder;

  constructor(data?: PartialMessage<HorseDetail_History>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.HorseDetail.History";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): HorseDetail_History;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): HorseDetail_History;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): HorseDetail_History;

  static equals(a: HorseDetail_History | PlainMessage<HorseDetail_History> | undefined, b: HorseDetail_History | PlainMessage<HorseDetail_History> | undefined): boolean;
}

/**
 * @generated from message spec.v1.HorseDetails
 */
export declare class HorseDetails extends Message<HorseDetails> {
  /**
   * @generated from field: repeated spec.v1.HorseDetail horse_details = 1;
   */
  horseDetails: HorseDetail[];

  constructor(data?: PartialMessage<HorseDetails>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.HorseDetails";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): HorseDetails;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): HorseDetails;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): HorseDetails;

  static equals(a: HorseDetails | PlainMessage<HorseDetails> | undefined, b: HorseDetails | PlainMessage<HorseDetails> | undefined): boolean;
}

/**
 * @generated from message spec.v1.HorseDataRequest
 */
export declare class HorseDataRequest extends Message<HorseDataRequest> {
  /**
   * @generated from field: uint32 id = 1;
   */
  id: number;

  constructor(data?: PartialMessage<HorseDataRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.HorseDataRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): HorseDataRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): HorseDataRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): HorseDataRequest;

  static equals(a: HorseDataRequest | PlainMessage<HorseDataRequest> | undefined, b: HorseDataRequest | PlainMessage<HorseDataRequest> | undefined): boolean;
}

/**
 * @generated from message spec.v1.HorseDataResponse
 */
export declare class HorseDataResponse extends Message<HorseDataResponse> {
  /**
   * @generated from field: spec.v1.HorseDetail horse = 1;
   */
  horse?: HorseDetail;

  constructor(data?: PartialMessage<HorseDataResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.HorseDataResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): HorseDataResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): HorseDataResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): HorseDataResponse;

  static equals(a: HorseDataResponse | PlainMessage<HorseDataResponse> | undefined, b: HorseDataResponse | PlainMessage<HorseDataResponse> | undefined): boolean;
}

/**
 * @generated from message spec.v1.AllHorseDataRequest
 */
export declare class AllHorseDataRequest extends Message<AllHorseDataRequest> {
  constructor(data?: PartialMessage<AllHorseDataRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.AllHorseDataRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AllHorseDataRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AllHorseDataRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AllHorseDataRequest;

  static equals(a: AllHorseDataRequest | PlainMessage<AllHorseDataRequest> | undefined, b: AllHorseDataRequest | PlainMessage<AllHorseDataRequest> | undefined): boolean;
}

/**
 * @generated from message spec.v1.AllHorseDataResponse
 */
export declare class AllHorseDataResponse extends Message<AllHorseDataResponse> {
  /**
   * 登録している馬が1頭もいない場合はエラーではなく[]を返す。
   *
   * @generated from field: repeated spec.v1.Horse horses = 1;
   */
  horses: Horse[];

  constructor(data?: PartialMessage<AllHorseDataResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.AllHorseDataResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AllHorseDataResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AllHorseDataResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AllHorseDataResponse;

  static equals(a: AllHorseDataResponse | PlainMessage<AllHorseDataResponse> | undefined, b: AllHorseDataResponse | PlainMessage<AllHorseDataResponse> | undefined): boolean;
}

/**
 * HorseDetailの初期値 id: id++, image: null, wins: 0, matches: 0, next: null, histories: []
 *
 * @generated from message spec.v1.RegisterHorseRequest
 */
export declare class RegisterHorseRequest extends Message<RegisterHorseRequest> {
  /**
   * @generated from field: string name = 1;
   */
  name: string;

  /**
   * 所有者名
   *
   * @generated from field: string owner = 2;
   */
  owner: string;

  constructor(data?: PartialMessage<RegisterHorseRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.RegisterHorseRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RegisterHorseRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RegisterHorseRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RegisterHorseRequest;

  static equals(a: RegisterHorseRequest | PlainMessage<RegisterHorseRequest> | undefined, b: RegisterHorseRequest | PlainMessage<RegisterHorseRequest> | undefined): boolean;
}

/**
 * @generated from message spec.v1.RegisterHorseResponse
 */
export declare class RegisterHorseResponse extends Message<RegisterHorseResponse> {
  constructor(data?: PartialMessage<RegisterHorseResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.RegisterHorseResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RegisterHorseResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RegisterHorseResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RegisterHorseResponse;

  static equals(a: RegisterHorseResponse | PlainMessage<RegisterHorseResponse> | undefined, b: RegisterHorseResponse | PlainMessage<RegisterHorseResponse> | undefined): boolean;
}

/**
 * @generated from message spec.v1.Race
 */
export declare class Race extends Message<Race> {
  /**
   * @generated from field: uint32 id = 1;
   */
  id: number;

  /**
   * @generated from field: string name = 2;
   */
  name: string;

  /**
   * @generated from field: uint32 order = 3;
   */
  order: number;

  /**
   * @generated from field: google.protobuf.Timestamp start = 4;
   */
  start?: Timestamp;

  /**
   * @generated from field: bool is_finished = 5;
   */
  isFinished: boolean;

  constructor(data?: PartialMessage<Race>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.Race";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Race;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Race;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Race;

  static equals(a: Race | PlainMessage<Race> | undefined, b: Race | PlainMessage<Race> | undefined): boolean;
}

/**
 * @generated from message spec.v1.RaceOrder
 */
export declare class RaceOrder extends Message<RaceOrder> {
  /**
   * @generated from oneof spec.v1.RaceOrder.order_oneof
   */
  orderOneof: {
    /**
     * 順位。最も早くゴールしたときに1。
     *
     * @generated from field: uint32 order = 1;
     */
    value: number;
    case: "order";
  } | {
    /**
     * @generated from field: spec.v1.RaceOrder.NoteType note = 2;
     */
    value: RaceOrder_NoteType;
    case: "note";
  } | { case: undefined; value?: undefined };

  constructor(data?: PartialMessage<RaceOrder>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.RaceOrder";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RaceOrder;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RaceOrder;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RaceOrder;

  static equals(a: RaceOrder | PlainMessage<RaceOrder> | undefined, b: RaceOrder | PlainMessage<RaceOrder> | undefined): boolean;
}

/**
 * @generated from enum spec.v1.RaceOrder.NoteType
 */
export declare enum RaceOrder_NoteType {
  /**
   * @generated from enum value: NOTE_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * 出走取消
   *
   * @generated from enum value: NOTE_TYPE_CANCEL = 1;
   */
  CANCEL = 1,

  /**
   * 競争中止
   *
   * @generated from enum value: NOTE_TYPE_GIVEUP = 2;
   */
  GIVEUP = 2,
}

/**
 * @generated from message spec.v1.RaceDetail
 */
export declare class RaceDetail extends Message<RaceDetail> {
  /**
   * @generated from field: spec.v1.Race data = 1;
   */
  data?: Race;

  /**
   * @generated from field: string description = 2;
   */
  description: string;

  /**
   * @generated from field: repeated spec.v1.RaceDetail.Member members = 4;
   */
  members: RaceDetail_Member[];

  /**
   * @generated from field: google.protobuf.Timestamp vote_begin = 5;
   */
  voteBegin?: Timestamp;

  /**
   * @generated from field: google.protobuf.Timestamp vote_end = 6;
   */
  voteEnd?: Timestamp;

  constructor(data?: PartialMessage<RaceDetail>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.RaceDetail";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RaceDetail;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RaceDetail;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RaceDetail;

  static equals(a: RaceDetail | PlainMessage<RaceDetail> | undefined, b: RaceDetail | PlainMessage<RaceDetail> | undefined): boolean;
}

/**
 * @generated from message spec.v1.RaceDetail.Member
 */
export declare class RaceDetail_Member extends Message<RaceDetail_Member> {
  /**
   * @generated from field: spec.v1.RaceOrder order = 1;
   */
  order?: RaceOrder;

  /**
   * @generated from field: spec.v1.Horse horse = 2;
   */
  horse?: Horse;

  /**
   * @generated from field: double odds = 3;
   */
  odds: number;

  /**
   * @generated from field: uint32 popularity = 4;
   */
  popularity: number;

  constructor(data?: PartialMessage<RaceDetail_Member>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.RaceDetail.Member";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RaceDetail_Member;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RaceDetail_Member;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RaceDetail_Member;

  static equals(a: RaceDetail_Member | PlainMessage<RaceDetail_Member> | undefined, b: RaceDetail_Member | PlainMessage<RaceDetail_Member> | undefined): boolean;
}

/**
 * @generated from message spec.v1.RaceDataRequest
 */
export declare class RaceDataRequest extends Message<RaceDataRequest> {
  /**
   * @generated from field: uint32 id = 1;
   */
  id: number;

  constructor(data?: PartialMessage<RaceDataRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.RaceDataRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RaceDataRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RaceDataRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RaceDataRequest;

  static equals(a: RaceDataRequest | PlainMessage<RaceDataRequest> | undefined, b: RaceDataRequest | PlainMessage<RaceDataRequest> | undefined): boolean;
}

/**
 * @generated from message spec.v1.RaceDataResponse
 */
export declare class RaceDataResponse extends Message<RaceDataResponse> {
  /**
   * @generated from field: spec.v1.RaceDetail race = 1;
   */
  race?: RaceDetail;

  constructor(data?: PartialMessage<RaceDataResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.RaceDataResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RaceDataResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RaceDataResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RaceDataResponse;

  static equals(a: RaceDataResponse | PlainMessage<RaceDataResponse> | undefined, b: RaceDataResponse | PlainMessage<RaceDataResponse> | undefined): boolean;
}

/**
 * @generated from message spec.v1.RangeRaceDataRequest
 */
export declare class RangeRaceDataRequest extends Message<RangeRaceDataRequest> {
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

  constructor(data?: PartialMessage<RangeRaceDataRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.RangeRaceDataRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RangeRaceDataRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RangeRaceDataRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RangeRaceDataRequest;

  static equals(a: RangeRaceDataRequest | PlainMessage<RangeRaceDataRequest> | undefined, b: RangeRaceDataRequest | PlainMessage<RangeRaceDataRequest> | undefined): boolean;
}

/**
 * @generated from message spec.v1.RangeRaceDataResponse
 */
export declare class RangeRaceDataResponse extends Message<RangeRaceDataResponse> {
  /**
   * @generated from field: repeated spec.v1.Race races = 1;
   */
  races: Race[];

  constructor(data?: PartialMessage<RangeRaceDataResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.RangeRaceDataResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RangeRaceDataResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RangeRaceDataResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RangeRaceDataResponse;

  static equals(a: RangeRaceDataResponse | PlainMessage<RangeRaceDataResponse> | undefined, b: RangeRaceDataResponse | PlainMessage<RangeRaceDataResponse> | undefined): boolean;
}

/**
 * RaceDetailの初期値 id: id++, is_finished: false, members: [], vote_begin:
 * start - n, vote_end: start - m
 *
 * @generated from message spec.v1.RegisterRaceRequest
 */
export declare class RegisterRaceRequest extends Message<RegisterRaceRequest> {
  /**
   * @generated from field: string name = 1;
   */
  name: string;

  /**
   * その日の何番目のレースか
   *
   * @generated from field: uint32 order = 2;
   */
  order: number;

  /**
   * 出走時刻
   *
   * @generated from field: google.protobuf.Timestamp start = 3;
   */
  start?: Timestamp;

  /**
   * コースなどの詳細説明
   *
   * @generated from field: string description = 4;
   */
  description: string;

  constructor(data?: PartialMessage<RegisterRaceRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.RegisterRaceRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RegisterRaceRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RegisterRaceRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RegisterRaceRequest;

  static equals(a: RegisterRaceRequest | PlainMessage<RegisterRaceRequest> | undefined, b: RegisterRaceRequest | PlainMessage<RegisterRaceRequest> | undefined): boolean;
}

/**
 * @generated from message spec.v1.RegisterRaceResponse
 */
export declare class RegisterRaceResponse extends Message<RegisterRaceResponse> {
  constructor(data?: PartialMessage<RegisterRaceResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.RegisterRaceResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RegisterRaceResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RegisterRaceResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RegisterRaceResponse;

  static equals(a: RegisterRaceResponse | PlainMessage<RegisterRaceResponse> | undefined, b: RegisterRaceResponse | PlainMessage<RegisterRaceResponse> | undefined): boolean;
}

/**
 * @generated from message spec.v1.VoteRequest
 */
export declare class VoteRequest extends Message<VoteRequest> {
  /**
   * 投票するレースのID
   *
   * @generated from field: uint32 race = 1;
   */
  race: number;

  /**
   * 投票する馬の馬番
   *
   * @generated from field: uint32 horse = 2;
   */
  horse: number;

  /**
   * @generated from field: spec.v1.JWT jwt = 3;
   */
  jwt?: JWT;

  constructor(data?: PartialMessage<VoteRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.VoteRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): VoteRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): VoteRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): VoteRequest;

  static equals(a: VoteRequest | PlainMessage<VoteRequest> | undefined, b: VoteRequest | PlainMessage<VoteRequest> | undefined): boolean;
}

/**
 * @generated from message spec.v1.VoteResponse
 */
export declare class VoteResponse extends Message<VoteResponse> {
  constructor(data?: PartialMessage<VoteResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.VoteResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): VoteResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): VoteResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): VoteResponse;

  static equals(a: VoteResponse | PlainMessage<VoteResponse> | undefined, b: VoteResponse | PlainMessage<VoteResponse> | undefined): boolean;
}

