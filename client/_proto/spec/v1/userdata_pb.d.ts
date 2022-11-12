// @generated by protoc-gen-es v0.2.1 with parameter "target=js+dts"
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
 * @generated from message spec.v1.Users
 */
export declare class Users extends Message<Users> {
  /**
   * @generated from field: repeated spec.v1.User users = 1;
   */
  users: User[];

  constructor(data?: PartialMessage<Users>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.Users";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Users;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Users;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Users;

  static equals(a: Users | PlainMessage<Users> | undefined, b: Users | PlainMessage<Users> | undefined): boolean;
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
 * @generated from message spec.v1.LoginAsAdminRequest
 */
export declare class LoginAsAdminRequest extends Message<LoginAsAdminRequest> {
  /**
   * @generated from field: string password = 1;
   */
  password: string;

  constructor(data?: PartialMessage<LoginAsAdminRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.LoginAsAdminRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): LoginAsAdminRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): LoginAsAdminRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): LoginAsAdminRequest;

  static equals(a: LoginAsAdminRequest | PlainMessage<LoginAsAdminRequest> | undefined, b: LoginAsAdminRequest | PlainMessage<LoginAsAdminRequest> | undefined): boolean;
}

/**
 * @generated from message spec.v1.LoginAsAdminResponse
 */
export declare class LoginAsAdminResponse extends Message<LoginAsAdminResponse> {
  /**
   * @generated from field: spec.v1.JWT admin_jwt = 3;
   */
  adminJwt?: JWT;

  constructor(data?: PartialMessage<LoginAsAdminResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.LoginAsAdminResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): LoginAsAdminResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): LoginAsAdminResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): LoginAsAdminResponse;

  static equals(a: LoginAsAdminResponse | PlainMessage<LoginAsAdminResponse> | undefined, b: LoginAsAdminResponse | PlainMessage<LoginAsAdminResponse> | undefined): boolean;
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
   * レース出走履歴
   *
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
   * 画像のデータ bytes(img)
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
 * HorseDetailの初期値 id: id++, image: null, wins: 0, matches: 0, next: null,
 * histories: []
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

  /**
   * admin JWT
   *
   * @generated from field: spec.v1.JWT admin_jwt = 3;
   */
  adminJwt?: JWT;

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
 * 非nullで渡された値を更新する
 *
 * @generated from message spec.v1.EditHorseRequest
 */
export declare class EditHorseRequest extends Message<EditHorseRequest> {
  /**
   * 対象を指定するため必須
   *
   * @generated from field: uint32 id = 1;
   */
  id: number;

  /**
   * @generated from field: optional string name = 2;
   */
  name?: string;

  /**
   * @generated from field: optional string owner = 3;
   */
  owner?: string;

  /**
   * @generated from field: optional spec.v1.HorseDetail.Image image = 4;
   */
  image?: HorseDetail_Image;

  /**
   * admin JWT
   *
   * @generated from field: spec.v1.JWT admin_jwt = 5;
   */
  adminJwt?: JWT;

  constructor(data?: PartialMessage<EditHorseRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.EditHorseRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EditHorseRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EditHorseRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EditHorseRequest;

  static equals(a: EditHorseRequest | PlainMessage<EditHorseRequest> | undefined, b: EditHorseRequest | PlainMessage<EditHorseRequest> | undefined): boolean;
}

/**
 * @generated from message spec.v1.EditHorseResponse
 */
export declare class EditHorseResponse extends Message<EditHorseResponse> {
  constructor(data?: PartialMessage<EditHorseResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.EditHorseResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EditHorseResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EditHorseResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EditHorseResponse;

  static equals(a: EditHorseResponse | PlainMessage<EditHorseResponse> | undefined, b: EditHorseResponse | PlainMessage<EditHorseResponse> | undefined): boolean;
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
   * 第nレースのnのように、その日の何番目のレースなのかを指定する。1オリジン。
   *
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
   * 出走取消。止むを得ず馬を出走させられなかった場合。
   *
   * @generated from enum value: NOTE_TYPE_CANCEL = 1;
   */
  CANCEL = 1,

  /**
   * 競争中止。発走したがゴールできなかった場合。
   *
   * @generated from enum value: NOTE_TYPE_GIVEUP = 2;
   */
  GIVEUP = 2,

  /**
   * 競争除外。検査不合格などでレースに出走できなかった場合。
   *
   * @generated from enum value: NOTE_TYPE_EXCLUDE = 3;
   */
  EXCLUDE = 3,
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
 * @generated from message spec.v1.RaceDetails
 */
export declare class RaceDetails extends Message<RaceDetails> {
  /**
   * @generated from field: repeated spec.v1.RaceDetail race_details = 1;
   */
  raceDetails: RaceDetail[];

  constructor(data?: PartialMessage<RaceDetails>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.RaceDetails";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RaceDetails;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RaceDetails;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RaceDetails;

  static equals(a: RaceDetails | PlainMessage<RaceDetails> | undefined, b: RaceDetails | PlainMessage<RaceDetails> | undefined): boolean;
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
 * @generated from message spec.v1.AllRaceDataRequest
 */
export declare class AllRaceDataRequest extends Message<AllRaceDataRequest> {
  constructor(data?: PartialMessage<AllRaceDataRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.AllRaceDataRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AllRaceDataRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AllRaceDataRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AllRaceDataRequest;

  static equals(a: AllRaceDataRequest | PlainMessage<AllRaceDataRequest> | undefined, b: AllRaceDataRequest | PlainMessage<AllRaceDataRequest> | undefined): boolean;
}

/**
 * @generated from message spec.v1.AllRaceDataResponse
 */
export declare class AllRaceDataResponse extends Message<AllRaceDataResponse> {
  /**
   * @generated from field: repeated spec.v1.Race races = 1;
   */
  races: Race[];

  constructor(data?: PartialMessage<AllRaceDataResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.AllRaceDataResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AllRaceDataResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AllRaceDataResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AllRaceDataResponse;

  static equals(a: AllRaceDataResponse | PlainMessage<AllRaceDataResponse> | undefined, b: AllRaceDataResponse | PlainMessage<AllRaceDataResponse> | undefined): boolean;
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

  /**
   * admin JWT
   *
   * @generated from field: spec.v1.JWT admin_jwt = 5;
   */
  adminJwt?: JWT;

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
 * @generated from message spec.v1.RegisterRaceResultRequest
 */
export declare class RegisterRaceResultRequest extends Message<RegisterRaceResultRequest> {
  /**
   * 対象を指定するため必須
   *
   * @generated from field: uint32 id = 1;
   */
  id: number;

  /**
   * @generated from field: repeated spec.v1.RaceDetail.Member members = 2;
   */
  members: RaceDetail_Member[];

  /**
   * admin JWT
   *
   * @generated from field: spec.v1.JWT admin_jwt = 3;
   */
  adminJwt?: JWT;

  constructor(data?: PartialMessage<RegisterRaceResultRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.RegisterRaceResultRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RegisterRaceResultRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RegisterRaceResultRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RegisterRaceResultRequest;

  static equals(a: RegisterRaceResultRequest | PlainMessage<RegisterRaceResultRequest> | undefined, b: RegisterRaceResultRequest | PlainMessage<RegisterRaceResultRequest> | undefined): boolean;
}

/**
 * @generated from message spec.v1.RegisterRaceResultResponse
 */
export declare class RegisterRaceResultResponse extends Message<RegisterRaceResultResponse> {
  constructor(data?: PartialMessage<RegisterRaceResultResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.RegisterRaceResultResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RegisterRaceResultResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RegisterRaceResultResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RegisterRaceResultResponse;

  static equals(a: RegisterRaceResultResponse | PlainMessage<RegisterRaceResultResponse> | undefined, b: RegisterRaceResultResponse | PlainMessage<RegisterRaceResultResponse> | undefined): boolean;
}

/**
 * 値が入ってたら更新する。
 *
 * @generated from message spec.v1.EditRaceRequest
 */
export declare class EditRaceRequest extends Message<EditRaceRequest> {
  /**
   * 対象を指定するため必須
   *
   * @generated from field: uint32 id = 1;
   */
  id: number;

  /**
   * @generated from field: optional string name = 2;
   */
  name?: string;

  /**
   * 第nレースのnのように、その日の何番目のレースなのかを指定する。1オリジン。
   *
   * @generated from field: optional uint32 order = 3;
   */
  order?: number;

  /**
   * @generated from field: optional google.protobuf.Timestamp start = 4;
   */
  start?: Timestamp;

  /**
   * @generated from field: optional string description = 5;
   */
  description?: string;

  /**
   * 馬のidの配列で指定
   *
   * @generated from field: repeated uint32 members = 6;
   */
  members: number[];

  /**
   * admin JWT
   *
   * @generated from field: spec.v1.JWT admin_jwt = 7;
   */
  adminJwt?: JWT;

  constructor(data?: PartialMessage<EditRaceRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.EditRaceRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EditRaceRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EditRaceRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EditRaceRequest;

  static equals(a: EditRaceRequest | PlainMessage<EditRaceRequest> | undefined, b: EditRaceRequest | PlainMessage<EditRaceRequest> | undefined): boolean;
}

/**
 * @generated from message spec.v1.EditRaceResponse
 */
export declare class EditRaceResponse extends Message<EditRaceResponse> {
  constructor(data?: PartialMessage<EditRaceResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.v1.EditRaceResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EditRaceResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EditRaceResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EditRaceResponse;

  static equals(a: EditRaceResponse | PlainMessage<EditRaceResponse> | undefined, b: EditRaceResponse | PlainMessage<EditRaceResponse> | undefined): boolean;
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

  /**
   * @generated from field: spec.v1.User user = 4;
   */
  user?: User;

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

