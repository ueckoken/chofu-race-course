// @generated by protoc-gen-connect-web v0.11.0 with parameter "target=js+dts"
// @generated from file spec/v1/userdata.proto (package spec.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { AllHorseDataRequest, AllHorseDataResponse, AllRaceDataRequest, AllRaceDataResponse, CreateUserRequest, CreateUserResponse, DeleteRaceResultRequest, DeleteRaceResultResponse, EditHorseRequest, EditHorseResponse, EditRaceRequest, EditRaceResponse, HorseDataRequest, HorseDataResponse, LoginAsAdminRequest, LoginAsAdminResponse, RaceDataRequest, RaceDataResponse, RegisterHorseRequest, RegisterHorseResponse, RegisterRaceRequest, RegisterRaceResponse, RegisterRaceResultRequest, RegisterRaceResultResponse, UserDataRequest, UserDataResponse, VoteRequest, VoteResponse } from "./userdata_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * ユーザのデータをやり取りするサービス
 *
 * @generated from service spec.v1.UserDataService
 */
export const UserDataService = {
  typeName: "spec.v1.UserDataService",
  methods: {
    /**
     * 要ユーザ認証: UserIdからUser情報を取得する
     *
     * @generated from rpc spec.v1.UserDataService.UserData
     */
    userData: {
      name: "UserData",
      I: UserDataRequest,
      O: UserDataResponse,
      kind: MethodKind.Unary,
    },
    /**
     * 新規Userを作成する
     *
     * @generated from rpc spec.v1.UserDataService.CreateUser
     */
    createUser: {
      name: "CreateUser",
      I: CreateUserRequest,
      O: CreateUserResponse,
      kind: MethodKind.Unary,
    },
    /**
     * 管理者としてログインを試みる
     *
     * @generated from rpc spec.v1.UserDataService.LoginAsAdmin
     */
    loginAsAdmin: {
      name: "LoginAsAdmin",
      I: LoginAsAdminRequest,
      O: LoginAsAdminResponse,
      kind: MethodKind.Unary,
    },
  }
};

/**
 * @generated from service spec.v1.HorseDataService
 */
export const HorseDataService = {
  typeName: "spec.v1.HorseDataService",
  methods: {
    /**
     * @generated from rpc spec.v1.HorseDataService.HorseData
     */
    horseData: {
      name: "HorseData",
      I: HorseDataRequest,
      O: HorseDataResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc spec.v1.HorseDataService.AllHorseData
     */
    allHorseData: {
      name: "AllHorseData",
      I: AllHorseDataRequest,
      O: AllHorseDataResponse,
      kind: MethodKind.Unary,
    },
    /**
     * 要Admin認証
     *
     * @generated from rpc spec.v1.HorseDataService.RegisterHorse
     */
    registerHorse: {
      name: "RegisterHorse",
      I: RegisterHorseRequest,
      O: RegisterHorseResponse,
      kind: MethodKind.Unary,
    },
    /**
     * 要Admin認証
     *
     * @generated from rpc spec.v1.HorseDataService.EditHorse
     */
    editHorse: {
      name: "EditHorse",
      I: EditHorseRequest,
      O: EditHorseResponse,
      kind: MethodKind.Unary,
    },
  }
};

/**
 * @generated from service spec.v1.RaceDataService
 */
export const RaceDataService = {
  typeName: "spec.v1.RaceDataService",
  methods: {
    /**
     * @generated from rpc spec.v1.RaceDataService.AllRaceData
     */
    allRaceData: {
      name: "AllRaceData",
      I: AllRaceDataRequest,
      O: AllRaceDataResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc spec.v1.RaceDataService.RaceData
     */
    raceData: {
      name: "RaceData",
      I: RaceDataRequest,
      O: RaceDataResponse,
      kind: MethodKind.Unary,
    },
    /**
     * 要Admin認証
     *
     * @generated from rpc spec.v1.RaceDataService.RegisterRace
     */
    registerRace: {
      name: "RegisterRace",
      I: RegisterRaceRequest,
      O: RegisterRaceResponse,
      kind: MethodKind.Unary,
    },
    /**
     * 要Admin認証、結果の入力に使う(他のデータにも影響が発生する)
     *
     * @generated from rpc spec.v1.RaceDataService.RegisterRaceResult
     */
    registerRaceResult: {
      name: "RegisterRaceResult",
      I: RegisterRaceResultRequest,
      O: RegisterRaceResultResponse,
      kind: MethodKind.Unary,
    },
    /**
     * 要Admin認証、データの編集に使う
     *
     * @generated from rpc spec.v1.RaceDataService.EditRace
     */
    editRace: {
      name: "EditRace",
      I: EditRaceRequest,
      O: EditRaceResponse,
      kind: MethodKind.Unary,
    },
    /**
     * 要Admin認証、データの編集に使う
     *
     * @generated from rpc spec.v1.RaceDataService.DeleteRaceResult
     */
    deleteRaceResult: {
      name: "DeleteRaceResult",
      I: DeleteRaceResultRequest,
      O: DeleteRaceResultResponse,
      kind: MethodKind.Unary,
    },
  }
};

/**
 * @generated from service spec.v1.VoteService
 */
export const VoteService = {
  typeName: "spec.v1.VoteService",
  methods: {
    /**
     * 要ユーザ認証: 投票する
     *
     * @generated from rpc spec.v1.VoteService.Vote
     */
    vote: {
      name: "Vote",
      I: VoteRequest,
      O: VoteResponse,
      kind: MethodKind.Unary,
    },
  }
};

