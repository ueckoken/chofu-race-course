import { FC, useEffect, useState } from "react";
import { Timestamp } from "@bufbuild/protobuf";
import {
    HorseDetail_Image,
    JWT,
    RaceDetail_Member,
    RaceOrder_NoteType,
} from "../../_proto/spec/v1/userdata_pb";
import { horseClient, raceClient } from "../util/client";
import { stringToImageType, stringToRaceOrder } from "../util/util";

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

const RegisterRaceResultField: FC<{ jwt: JWT | null }> = ({ jwt }) => {
    const [id, setId] = useState<number>(1);
    const [horses, setHorses] = useState<RaceDetail_Member[]>([]);
    useEffect(() => {
        raceClient
            .raceData({ id })
            .then((res) => setHorses(res.race!.members!));
    }, [id]);
    return (
        <fieldset>
            <legend>競争結果入力</legend>
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
            {horses.map((e) => (
                <div key={`h-${e.horse!.id}`}>
                    <label>
                        {e.horse!.name}:{" "}
                        <select
                            onChange={(ev) => {
                                setHorses(
                                    horses.map((h) => {
                                        if (h.horse!.id !== e.horse!.id)
                                            return h;
                                        return RaceDetail_Member.fromJson(
                                            JSON.parse(
                                                JSON.stringify({
                                                    ...h,
                                                    order: stringToRaceOrder(
                                                        ev.target.value
                                                    ).toJson(),
                                                })
                                            )
                                        );
                                    })
                                );
                            }}
                        >
                            <option value="1st">1着</option>
                            <option value="2nd">2着</option>
                            <option value="3rd">3着</option>
                            <option value="4th">4着</option>
                            <option value={RaceOrder_NoteType.CANCEL}>
                                取消
                            </option>
                            <option value={RaceOrder_NoteType.EXCLUDE}>
                                除外
                            </option>
                            <option value={RaceOrder_NoteType.GIVEUP}>
                                中止
                            </option>
                        </select>
                    </label>
                </div>
            ))}
            <button
                onClick={() => {
                    raceClient
                        .registerRaceResult({
                            adminJwt: jwt!,
                            members: horses,
                            id,
                        })
                        .then(() => alert("登録完了！"))
                        .catch((err) => {
                            console.error(err);
                            alert("登録失敗......");
                        });
                }}
            >
                決定
            </button>
        </fieldset>
    );
};

export {
    RegisterRaceField,
    EditRaceField,
    RegisterHorseField,
    EditHorseField,
    RegisterRaceResultField,
};
