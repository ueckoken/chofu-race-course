import { createPromiseClient } from "@bufbuild/connect-web";
import { FC, useEffect, useState } from "react";
import {
    HorseDataService,
    UserDataService,
} from "../../_proto/spec/v1/userdata_connectweb";
import { HorseDetail_Image, JWT } from "../../_proto/spec/v1/userdata_pb";
import { transport } from "../util/use-client";

const AdminPage: FC<{}> = () => {
    const [jwt, setJwt] = useState<JWT | null>(null);
    const [registerHorseName, setRegisterHorseName] = useState<string>("");
    const [registerOwnerName, setRegisterOwnerName] = useState<string>("");

    const [editHorseId, setEditHorseId] = useState<number>(0);
    const [editHorseName, setEditHorseName] = useState<string>("");
    const [editOwnerName, setEditOwnerName] = useState<string>("");
    const [editHorseImage, setEditHorseImage] =
        useState<HorseDetail_Image | null>();

    const userClient = createPromiseClient(UserDataService, transport);
    const horseClient = createPromiseClient(HorseDataService, transport);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
        const tmpJwt = new JWT();
        tmpJwt.token = token;
        setJwt(tmpJwt);
    }, []);
    return (
        <>
            <h2>管理</h2>
            <div>
                <button
                    onClick={() => {
                        (async () => {
                            const password =
                                prompt("パスワードを入力してください。");
                            if (!password) return;
                            const res = await userClient.loginAsAdmin({
                                password,
                            });
                            setJwt(res.adminJwt!);
                            localStorage.setItem("token", res.adminJwt!.token);
                        })();
                    }}
                >
                    ログイン
                </button>
                : {jwt ? "ログイン済" : "未ログイン"}
            </div>
            <fieldset>
                <legend>競争馬登録</legend>
                <div>
                    <label>
                        馬名:{" "}
                        <input
                            type="text"
                            value={registerHorseName}
                            onChange={(e) =>
                                setRegisterHorseName(e.target.value)
                            }
                        />
                    </label>
                </div>
                <div>
                    <label>
                        馬主名:{" "}
                        <input
                            type="text"
                            value={registerOwnerName}
                            onChange={(e) =>
                                setRegisterOwnerName(e.target.value)
                            }
                        />
                    </label>
                </div>
                <button
                    onClick={() =>
                        horseClient
                            .registerHorse({
                                adminJwt: jwt!,
                                name: registerHorseName,
                                owner: registerOwnerName,
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

            <fieldset>
                <legend>競争馬編集</legend>
                <div>
                    <label>
                        id:{" "}
                        <input
                            type="number"
                            value={editHorseId}
                            onChange={(e) => setEditHorseId(+e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        馬名:{" "}
                        <input
                            type="text"
                            value={editHorseName}
                            onChange={(e) => setEditHorseName(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        馬主名:{" "}
                        <input
                            type="text"
                            value={editOwnerName}
                            onChange={(e) => setEditOwnerName(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        写真: <input type="file" />
                    </label>
                </div>
                <button
                    onClick={() => {
                        horseClient.editHorse({
                            id: editHorseId,
                            name:
                                editHorseName !== ""
                                    ? editHorseName
                                    : undefined,
                            owner:
                                editOwnerName !== ""
                                    ? editOwnerName
                                    : undefined,
                        });
                    }}
                >
                    登録
                </button>
            </fieldset>
        </>
    );
};

export default AdminPage;
