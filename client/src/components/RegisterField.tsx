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
    const [name, setName] = useState<string>("");
    const [order, setOrder] = useState<number>(0);
    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    return (
        <fieldset>
            <legend>レース登録</legend>
            <div>
                <label>
                    名前:{" "}
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    順番:{" "}
                    <input
                        type="number"
                        value={order}
                        onChange={(e) => setOrder(+e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    日付:{" "}
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    時刻:{" "}
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    説明:{" "}
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
            </div>
            <button
                onClick={() => {
                    if (date === "" || time === "") {
                        alert("不正な入力です。");
                        return;
                    }
                    raceClient
                        .registerRace({
                            name,
                            order,
                            start: Timestamp.fromDate(
                                new Date(`${date}T${time}`)
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
    const [id, setId] = useState<number>(0);
    const [name, setName] = useState<string>("");
    const [order, setOrder] = useState<number>(0);
    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState<string>("");
    const [member, setMember] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    return (
        <fieldset>
            <legend>レース編集</legend>
            <div>
                <label>
                    id:{" "}
                    <input
                        type="number"
                        value={id}
                        onChange={(e) => setId(+e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    レース名:{" "}
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    R:{" "}
                    <input
                        type="number"
                        value={order}
                        onChange={(e) => setOrder(+e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    日付:{" "}
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    時刻:{" "}
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    メンバー:{" "}
                    <input
                        type="text"
                        value={member}
                        onChange={(e) => setMember(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    説明:{" "}
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
            </div>
            <button
                onClick={() =>
                    raceClient
                        .editRace({
                            adminJwt: jwt!,
                            id,
                            name: name !== "" ? name : undefined,
                            order: order !== 0 ? order : undefined,
                            start:
                                date !== "" && time !== ""
                                    ? Timestamp.fromDate(
                                          new Date(`${date}T${time}`)
                                      )
                                    : undefined,
                            description:
                                description !== "" ? description : undefined,
                            members:
                                member !== ""
                                    ? member.split(",").map((e) => {
                                          if (Number.isNaN(+e))
                                              throw new Error();
                                          return +e;
                                      })
                                    : undefined,
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

const RegisterHorseField: FC<{ jwt: JWT | null }> = ({ jwt }) => {
    const [name, setName] = useState<string>("");
    const [owner, setOwner] = useState<string>("");
    return (
        <fieldset>
            <legend>競争馬登録</legend>
            <div>
                <label>
                    馬名:{" "}
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    馬主名:{" "}
                    <input
                        type="text"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                    />
                </label>
            </div>
            <button
                onClick={() =>
                    horseClient
                        .registerHorse({
                            adminJwt: jwt!,
                            name,
                            owner,
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
    const [id, setId] = useState<number>(0);
    const [name, setName] = useState<string>("");
    const [owner, setOwner] = useState<string>("");
    const [image, setImage] = useState<HorseDetail_Image | undefined>(
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
                        value={id}
                        onChange={(e) => setId(+e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    馬名:{" "}
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    馬主名:{" "}
                    <input
                        type="text"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
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
                                setImage(img);
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
                            id,
                            adminJwt: jwt!,
                            name: name !== "" ? name : undefined,
                            owner: owner !== "" ? owner : undefined,
                            image,
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
