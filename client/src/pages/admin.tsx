import { createPromiseClient } from "@bufbuild/connect-web";
import { FC, useEffect, useState } from "react";
import {
    HorseDataService,
    UserDataService,
} from "../../_proto/spec/v1/userdata_connectweb";
import { JWT } from "../../_proto/spec/v1/userdata_pb";
import { transport } from "../util/use-client";

const AdminPage: FC<{}> = () => {
    const [jwt, setJwt] = useState<JWT | null>(null);
    const [horseName, setHorseName] = useState<string>("");
    const [ownerName, setOwnerName] = useState<string>("");
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
                    }
                >
                    登録
                </button>
            </fieldset>

            <fieldset>
                <legend>競争馬編集</legend>
                <div>
                    <label>
                        id: <input type="number" />
                    </label>
                </div>
                <div>
                    <label>
                        馬名: <input type="text" />
                    </label>
                </div>
                <div>
                    <label>
                        馬主名: <input type="text" />
                    </label>
                </div>
                <div>
                    <label>
                        写真: <input type="file" />
                    </label>
                </div>
            </fieldset>
        </>
    );
};

export default AdminPage;
