import { FC, useState } from "react";
import { createPromiseClient } from "@bufbuild/connect-web";
import { Timestamp } from "@bufbuild/protobuf";
import {
    HorseDataService,
    RaceDataService,
} from "../../_proto/spec/v1/userdata_connectweb";
import { HorseDetail_Image, JWT } from "../../_proto/spec/v1/userdata_pb";
import { transport } from "../util/use-client";
import { stringToImageType } from "../util/util";

const horseClient = createPromiseClient(HorseDataService, transport);
const raceClient = createPromiseClient(RaceDataService, transport);

const RegisterRaceField: FC<{ jwt: JWT | null }> = ({ jwt }) => {
    const [raceName, setRaceName] = useState<string>("");
    const [raceOrder, setRaceOrder] = useState<number>(0);
    const [raceDate, setRaceDate] = useState<string>("");
    const [raceTime, setRaceTime] = useState<string>("");
    const [raceDescription, setRaceDescription] = useState<string>("");
    return (
        <fieldset>
            <legend>レース登録</legend>
            <div>
                <label>
                    名前:{" "}
                    <input
                        type="text"
                        value={raceName}
                        onChange={(e) => setRaceName(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    順番:{" "}
                    <input
                        type="number"
                        value={raceOrder}
                        onChange={(e) => setRaceOrder(+e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    日付:{" "}
                    <input
                        type="date"
                        value={raceDate}
                        onChange={(e) => setRaceDate(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    時刻:{" "}
                    <input
                        type="time"
                        value={raceTime}
                        onChange={(e) => setRaceTime(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    説明:{" "}
                    <input
                        type="text"
                        value={raceDescription}
                        onChange={(e) => setRaceDescription(e.target.value)}
                    />
                </label>
            </div>
            <button
                onClick={() => {
                    if (raceDate === "" || raceTime === "") {
                        alert("不正な入力です。");
                        return;
                    }
                    raceClient
                        .registerRace({
                            name: raceName,
                            order: raceOrder,
                            start: Timestamp.fromDate(
                                new Date(`${raceDate}T${raceTime}`)
                            ),
                            adminJwt: jwt!,
                        })
                        .then(() => alert("登録完了！"))
                        .catch((err) => {
                            console.error(err);
                            alert("登録失敗......");
                        });
                }}
            >
                登録
            </button>
        </fieldset>
    );
};

const EditRaceField: FC<{ jwt: JWT | null }> = ({ jwt }) => {
    return (
        <fieldset>
            <legend>レース編集</legend>
            <div>
                <label>
                    id: <input type="number" />
                </label>
            </div>
            <div>
                <label>
                    レース名: <input type="text" />
                </label>
            </div>
            <div>
                <label>
                    R: <input type="number" />
                </label>
            </div>
            <div>
                <label>
                    日付: <input type="date" />
                </label>
            </div>
            <div>
                <label>
                    時刻: <input type="time" />
                </label>
            </div>
            <div>
                <label>
                    メンバー: <input type="text" />
                </label>
            </div>
            <div>
                <label>
                    説明: <input type="text" />
                </label>
            </div>
            <button>編集</button>
        </fieldset>
    );
};

const RegisterHorseField: FC<{ jwt: JWT | null }> = ({ jwt }) => {
    const [horseName, setHorseName] = useState<string>("");
    const [ownerName, setOwnerName] = useState<string>("");
    return (
        <fieldset>
            <legend>競争馬登録</legend>
            <div>
                <label>
                    馬名:{" "}
                    <input
                        type="text"
                        value={horseName}
                        onChange={(e) => setHorseName(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    馬主名:{" "}
                    <input
                        type="text"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                    />
                </label>
            </div>
            <button
                onClick={() =>
                    horseClient
                        .registerHorse({
                            adminJwt: jwt!,
                            name: horseName,
                            owner: ownerName,
                        })
                        .then(() => alert("登録完了！"))
                        .catch((err) => {
                            console.error(err);
                            alert("登録失敗......");
                        })
                }
            >
                登録
            </button>
        </fieldset>
    );
};

const EditHorseField: FC<{ jwt: JWT | null }> = ({ jwt }) => {
    const [horseId, setHorseId] = useState<number>(0);
    const [horseName, setHorseName] = useState<string>("");
    const [ownerName, setOwnerName] = useState<string>("");
    const [horseImage, setHorseImage] = useState<HorseDetail_Image | undefined>(
        undefined
    );
    return (
        <fieldset>
            <legend>競争馬編集</legend>
            <div>
                <label>
                    id:{" "}
                    <input
                        type="number"
                        value={horseId}
                        onChange={(e) => setHorseId(+e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    馬名:{" "}
                    <input
                        type="text"
                        value={horseName}
                        onChange={(e) => setHorseName(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    馬主名:{" "}
                    <input
                        type="text"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    写真:{" "}
                    <input
                        type="file"
                        onChange={(e) => {
                            const file = e.target.files![0];
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                                const base64 = ev.target!.result! as string;
                                const regex = /^data:image\/(.+);base64,(.+)/;
                                const match = base64.match(regex);
                                if (!match) return;
                                const [, type, data] = match;
                                const img = new HorseDetail_Image();
                                img.type = stringToImageType(type);
                                img.data = new TextEncoder().encode(data);
                                setHorseImage(img);
                            };
                            reader.readAsDataURL(file);
                        }}
                    />
                </label>
            </div>
            <button
                onClick={() =>
                    horseClient
                        .editHorse({
                            id: horseId,
                            adminJwt: jwt!,
                            name: horseName !== "" ? horseName : undefined,
                            owner: ownerName !== "" ? ownerName : undefined,
                            image: horseImage,
                        })
                        .then(() => alert("編集完了！"))
                        .catch((err) => {
                            console.error(err);
                            alert("編集失敗......");
                        })
                }
            >
                編集
            </button>
        </fieldset>
    );
};

export { RegisterRaceField, EditRaceField, RegisterHorseField, EditHorseField };
