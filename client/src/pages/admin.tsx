import { FC, useEffect, useState } from "react";
import { JWT } from "../../_proto/spec/v1/userdata_pb";
import { userClient } from "../util/client";

import {
    RegisterHorseField,
    EditRaceField,
    RegisterRaceField,
    EditHorseField,
    RegisterRaceResultField,
    DeleteRaceResultField,
} from "../components/RegisterField";

const AdminPage: FC<{}> = () => {
    const [jwt, setJwt] = useState<JWT | null>(null);

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

            <RegisterRaceField jwt={jwt} />

            <EditRaceField jwt={jwt} />

            <RegisterHorseField jwt={jwt} />

            <EditHorseField jwt={jwt} />

            <RegisterRaceResultField jwt={jwt} />

            <DeleteRaceResultField jwt={jwt} />
        </>
    );
};

export default AdminPage;
