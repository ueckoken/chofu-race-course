// @generated by protoc-gen-connect-web v0.3.1 with parameter "target=js+dts"
// @generated from file spec/v1/userdata.proto (package spec.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import {AllHorseDataRequest, AllHorseDataResponse, AllRaceDataRequest, AllRaceDataResponse, CreateUserRequest, CreateUserResponse, EditHorseRequest, EditHorseResponse, EditRaceRequest, EditRaceResponse, EraseRaceRequest, EraseRaceResponse, HorseDataRequest, HorseDataResponse, LoginAsAdminRequest, LoginAsAdminResponse, RaceDataRequest, RaceDataResponse, RegisterHorseRequest, RegisterHorseResponse, RegisterRaceRequest, RegisterRaceResponse, RegisterRaceResultRequest, RegisterRaceResultResponse, UserDataRequest, UserDataResponse, VoteRequest, VoteResponse} from "./userdata_pb.js";
import {MethodKind} from "@bufbuild/protobuf";

/**
 * ユーザのデータをやり取りするサービス
 *
 * @generated from service spec.v1.UserDataService
 */
export declare const UserDataService: {
  readonly typeName: "spec.v1.UserDataService",
  readonly methods: {
    /**
     * 要ユーザ認証: UserIdからUser情報を取得する
     *
     * @generated from rpc spec.v1.UserDataService.UserData
     */
    readonly userData: {
      readonly name: "UserData",
      readonly I: typeof UserDataRequest,
      readonly O: typeof UserDataResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * 新規Userを作成する
     *
     * @generated from rpc spec.v1.UserDataService.CreateUser
     */
    readonly createUser: {
      readonly name: "CreateUser",
      readonly I: typeof CreateUserRequest,
      readonly O: typeof CreateUserResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * 管理者としてログインを試みる
     *
     * @generated from rpc spec.v1.UserDataService.LoginAsAdmin
     */
    readonly loginAsAdmin: {
      readonly name: "LoginAsAdmin",
      readonly I: typeof LoginAsAdminRequest,
      readonly O: typeof LoginAsAdminResponse,
      readonly kind: MethodKind.Unary,
    },
  }
};

/**
 * @generated from service spec.v1.HorseDataService
 */
export declare const HorseDataService: {
  readonly typeName: "spec.v1.HorseDataService",
  readonly methods: {
    /**
     * @generated from rpc spec.v1.HorseDataService.HorseData
     */
    readonly horseData: {
      readonly name: "HorseData",
      readonly I: typeof HorseDataRequest,
      readonly O: typeof HorseDataResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc spec.v1.HorseDataService.AllHorseData
     */
    readonly allHorseData: {
      readonly name: "AllHorseData",
      readonly I: typeof AllHorseDataRequest,
      readonly O: typeof AllHorseDataResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * 要Admin認証
     *
     * @generated from rpc spec.v1.HorseDataService.RegisterHorse
     */
    readonly registerHorse: {
      readonly name: "RegisterHorse",
      readonly I: typeof RegisterHorseRequest,
      readonly O: typeof RegisterHorseResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * 要Admin認証
     *
     * @generated from rpc spec.v1.HorseDataService.EditHorse
     */
    readonly editHorse: {
      readonly name: "EditHorse",
      readonly I: typeof EditHorseRequest,
      readonly O: typeof EditHorseResponse,
      readonly kind: MethodKind.Unary,
    },
  }
};

/**
 * @generated from service spec.v1.RaceDataService
 */
export declare const RaceDataService: {
  readonly typeName: "spec.v1.RaceDataService",
  readonly methods: {
    /**
     * @generated from rpc spec.v1.RaceDataService.AllRaceData
     */
    readonly allRaceData: {
      readonly name: "AllRaceData",
      readonly I: typeof AllRaceDataRequest,
      readonly O: typeof AllRaceDataResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc spec.v1.RaceDataService.RaceData
     */
    readonly raceData: {
      readonly name: "RaceData",
      readonly I: typeof RaceDataRequest,
      readonly O: typeof RaceDataResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * 要Admin認証
     *
     * @generated from rpc spec.v1.RaceDataService.RegisterRace
     */
    readonly registerRace: {
      readonly name: "RegisterRace",
      readonly I: typeof RegisterRaceRequest,
      readonly O: typeof RegisterRaceResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * 要Admin認証、結果の入力に使う(他のデータにも影響が発生する)
     *
     * @generated from rpc spec.v1.RaceDataService.RegisterRaceResult
     */
    readonly registerRaceResult: {
      readonly name: "RegisterRaceResult",
      readonly I: typeof RegisterRaceResultRequest,
      readonly O: typeof RegisterRaceResultResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * 要Admin認証、データの編集に使う
     *
     * @generated from rpc spec.v1.RaceDataService.EditRace
     */
    readonly editRace: {
      readonly name: "EditRace",
      readonly I: typeof EditRaceRequest,
      readonly O: typeof EditRaceResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * 要Admin認証、データの編集に使う
     *
     * @generated from rpc spec.v1.RaceDataService.EraseRace
     */
    readonly eraseRace: {
      readonly name: "EraseRace",
      readonly I: typeof EraseRaceRequest,
      readonly O: typeof EraseRaceResponse,
      readonly kind: MethodKind.Unary,
    },
  }
};

/**
 * @generated from service spec.v1.VoteService
 */
export declare const VoteService: {
  readonly typeName: "spec.v1.VoteService",
  readonly methods: {
    /**
     * 要ユーザ認証: 投票する
     *
     * @generated from rpc spec.v1.VoteService.Vote
     */
    readonly vote: {
      readonly name: "Vote",
      readonly I: typeof VoteRequest,
      readonly O: typeof VoteResponse,
      readonly kind: MethodKind.Unary,
    },
  }
};

