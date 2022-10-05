// @generated by protoc-gen-es v0.1.1 with parameter "target=js+dts"
// @generated from file spec/v1/userdata.proto (package spec.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import {proto3, Timestamp} from "@bufbuild/protobuf";

/**
 * ユーザを表現する型
 *
 * @generated from message spec.v1.User
 */
export const User = proto3.makeMessageType(
  "spec.v1.User",
  () => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from message spec.v1.Users
 */
export const Users = proto3.makeMessageType(
  "spec.v1.Users",
  () => [
    { no: 1, name: "users", kind: "message", T: User, repeated: true },
  ],
);

/**
 * @generated from message spec.v1.UserDataRequest
 */
export const UserDataRequest = proto3.makeMessageType(
  "spec.v1.UserDataRequest",
  () => [
    { no: 1, name: "jwt", kind: "message", T: JWT },
  ],
);

/**
 * JWTトークン
 *
 * @generated from message spec.v1.JWT
 */
export const JWT = proto3.makeMessageType(
  "spec.v1.JWT",
  () => [
    { no: 1, name: "token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from message spec.v1.UserDataResponse
 */
export const UserDataResponse = proto3.makeMessageType(
  "spec.v1.UserDataResponse",
  () => [
    { no: 1, name: "user", kind: "message", T: User },
  ],
);

/**
 * @generated from message spec.v1.CreateUserRequest
 */
export const CreateUserRequest = proto3.makeMessageType(
  "spec.v1.CreateUserRequest",
  () => [
    { no: 1, name: "user", kind: "message", T: User },
  ],
);

/**
 * @generated from message spec.v1.CreateUserResponse
 */
export const CreateUserResponse = proto3.makeMessageType(
  "spec.v1.CreateUserResponse",
  () => [
    { no: 1, name: "user", kind: "message", T: User },
    { no: 2, name: "jwt", kind: "message", T: JWT },
  ],
);

/**
 * @generated from message spec.v1.LoginAsAdminRequest
 */
export const LoginAsAdminRequest = proto3.makeMessageType(
  "spec.v1.LoginAsAdminRequest",
  () => [
    { no: 1, name: "password", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from message spec.v1.LoginAsAdminResponse
 */
export const LoginAsAdminResponse = proto3.makeMessageType(
  "spec.v1.LoginAsAdminResponse",
  () => [
    { no: 3, name: "admin_jwt", kind: "message", T: JWT },
  ],
);

/**
 * @generated from message spec.v1.Horse
 */
export const Horse = proto3.makeMessageType(
  "spec.v1.Horse",
  () => [
    { no: 1, name: "id", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from message spec.v1.HorseDetail
 */
export const HorseDetail = proto3.makeMessageType(
  "spec.v1.HorseDetail",
  () => [
    { no: 1, name: "data", kind: "message", T: Horse },
    { no: 2, name: "owner", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "image", kind: "message", T: HorseDetail_Image, opt: true },
    { no: 4, name: "wins", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 5, name: "matches", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 6, name: "next", kind: "message", T: Race, opt: true },
    { no: 7, name: "histories", kind: "message", T: HorseDetail_History, repeated: true },
  ],
);

/**
 * @generated from message spec.v1.HorseDetail.Image
 */
export const HorseDetail_Image = proto3.makeMessageType(
  "spec.v1.HorseDetail.Image",
  () => [
    { no: 1, name: "type", kind: "enum", T: proto3.getEnumType(HorseDetail_Image_ImageType) },
    { no: 2, name: "data", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ],
  {localName: "HorseDetail_Image"},
);

/**
 * @generated from enum spec.v1.HorseDetail.Image.ImageType
 */
export const HorseDetail_Image_ImageType = proto3.makeEnum(
  "spec.v1.HorseDetail.Image.ImageType",
  [
    {no: 0, name: "IMAGE_TYPE_UNSPECIFIED", localName: "UNSPECIFIED"},
    {no: 1, name: "IMAGE_TYPE_PNG", localName: "PNG"},
    {no: 2, name: "IMAGE_TYPE_JPEG", localName: "JPEG"},
    {no: 3, name: "IMAGE_TYPE_GIF", localName: "GIF"},
  ],
);

/**
 * 出走履歴のそれぞれ
 *
 * @generated from message spec.v1.HorseDetail.History
 */
export const HorseDetail_History = proto3.makeMessageType(
  "spec.v1.HorseDetail.History",
  () => [
    { no: 1, name: "race", kind: "message", T: Race },
    { no: 2, name: "order", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 3, name: "result", kind: "message", T: RaceOrder },
  ],
  {localName: "HorseDetail_History"},
);

/**
 * @generated from message spec.v1.HorseDetails
 */
export const HorseDetails = proto3.makeMessageType(
  "spec.v1.HorseDetails",
  () => [
    { no: 1, name: "horse_details", kind: "message", T: HorseDetail, repeated: true },
  ],
);

/**
 * @generated from message spec.v1.HorseDataRequest
 */
export const HorseDataRequest = proto3.makeMessageType(
  "spec.v1.HorseDataRequest",
  () => [
    { no: 1, name: "id", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
  ],
);

/**
 * @generated from message spec.v1.HorseDataResponse
 */
export const HorseDataResponse = proto3.makeMessageType(
  "spec.v1.HorseDataResponse",
  () => [
    { no: 1, name: "horse", kind: "message", T: HorseDetail },
  ],
);

/**
 * @generated from message spec.v1.AllHorseDataRequest
 */
export const AllHorseDataRequest = proto3.makeMessageType(
  "spec.v1.AllHorseDataRequest",
  [],
);

/**
 * @generated from message spec.v1.AllHorseDataResponse
 */
export const AllHorseDataResponse = proto3.makeMessageType(
  "spec.v1.AllHorseDataResponse",
  () => [
    { no: 1, name: "horses", kind: "message", T: Horse, repeated: true },
  ],
);

/**
 * HorseDetailの初期値 id: id++, image: null, wins: 0, matches: 0, next: null, histories: []
 *
 * @generated from message spec.v1.RegisterHorseRequest
 */
export const RegisterHorseRequest = proto3.makeMessageType(
  "spec.v1.RegisterHorseRequest",
  () => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "owner", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "admin_jwt", kind: "message", T: JWT },
  ],
);

/**
 * @generated from message spec.v1.RegisterHorseResponse
 */
export const RegisterHorseResponse = proto3.makeMessageType(
  "spec.v1.RegisterHorseResponse",
  [],
);

/**
 * @generated from message spec.v1.Race
 */
export const Race = proto3.makeMessageType(
  "spec.v1.Race",
  () => [
    { no: 1, name: "id", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "order", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 4, name: "start", kind: "message", T: Timestamp },
    { no: 5, name: "is_finished", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ],
);

/**
 * @generated from message spec.v1.RaceOrder
 */
export const RaceOrder = proto3.makeMessageType(
  "spec.v1.RaceOrder",
  () => [
    { no: 1, name: "order", kind: "scalar", T: 13 /* ScalarType.UINT32 */, oneof: "order_oneof" },
    { no: 2, name: "note", kind: "enum", T: proto3.getEnumType(RaceOrder_NoteType), oneof: "order_oneof" },
  ],
);

/**
 * @generated from enum spec.v1.RaceOrder.NoteType
 */
export const RaceOrder_NoteType = proto3.makeEnum(
  "spec.v1.RaceOrder.NoteType",
  [
    {no: 0, name: "NOTE_TYPE_UNSPECIFIED", localName: "UNSPECIFIED"},
    {no: 1, name: "NOTE_TYPE_CANCEL", localName: "CANCEL"},
    {no: 2, name: "NOTE_TYPE_GIVEUP", localName: "GIVEUP"},
  ],
);

/**
 * @generated from message spec.v1.RaceDetail
 */
export const RaceDetail = proto3.makeMessageType(
  "spec.v1.RaceDetail",
  () => [
    { no: 1, name: "data", kind: "message", T: Race },
    { no: 2, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "members", kind: "message", T: RaceDetail_Member, repeated: true },
    { no: 5, name: "vote_begin", kind: "message", T: Timestamp },
    { no: 6, name: "vote_end", kind: "message", T: Timestamp },
  ],
);

/**
 * @generated from message spec.v1.RaceDetail.Member
 */
export const RaceDetail_Member = proto3.makeMessageType(
  "spec.v1.RaceDetail.Member",
  () => [
    { no: 1, name: "order", kind: "message", T: RaceOrder },
    { no: 2, name: "horse", kind: "message", T: Horse },
    { no: 3, name: "odds", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 4, name: "popularity", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
  ],
  {localName: "RaceDetail_Member"},
);

/**
 * @generated from message spec.v1.RaceDataRequest
 */
export const RaceDataRequest = proto3.makeMessageType(
  "spec.v1.RaceDataRequest",
  () => [
    { no: 1, name: "id", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
  ],
);

/**
 * @generated from message spec.v1.RaceDataResponse
 */
export const RaceDataResponse = proto3.makeMessageType(
  "spec.v1.RaceDataResponse",
  () => [
    { no: 1, name: "race", kind: "message", T: RaceDetail },
  ],
);

/**
 * @generated from message spec.v1.RangeRaceDataRequest
 */
export const RangeRaceDataRequest = proto3.makeMessageType(
  "spec.v1.RangeRaceDataRequest",
  () => [
    { no: 1, name: "begin", kind: "message", T: Timestamp, opt: true },
    { no: 2, name: "end", kind: "message", T: Timestamp, opt: true },
  ],
);

/**
 * @generated from message spec.v1.RangeRaceDataResponse
 */
export const RangeRaceDataResponse = proto3.makeMessageType(
  "spec.v1.RangeRaceDataResponse",
  () => [
    { no: 1, name: "races", kind: "message", T: Race, repeated: true },
  ],
);

/**
 * RaceDetailの初期値 id: id++, is_finished: false, members: [], vote_begin:
 * start - n, vote_end: start - m
 *
 * @generated from message spec.v1.RegisterRaceRequest
 */
export const RegisterRaceRequest = proto3.makeMessageType(
  "spec.v1.RegisterRaceRequest",
  () => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "order", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 3, name: "start", kind: "message", T: Timestamp },
    { no: 4, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "admin_jwt", kind: "message", T: JWT },
  ],
);

/**
 * @generated from message spec.v1.RegisterRaceResponse
 */
export const RegisterRaceResponse = proto3.makeMessageType(
  "spec.v1.RegisterRaceResponse",
  [],
);

/**
 * @generated from message spec.v1.VoteRequest
 */
export const VoteRequest = proto3.makeMessageType(
  "spec.v1.VoteRequest",
  () => [
    { no: 1, name: "race", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 2, name: "horse", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 3, name: "jwt", kind: "message", T: JWT },
  ],
);

/**
 * @generated from message spec.v1.VoteResponse
 */
export const VoteResponse = proto3.makeMessageType(
  "spec.v1.VoteResponse",
  [],
);

