import { FC } from "react";

const AdminPage: FC<{}> = () => {
    return (
        <>
            <h2>管理</h2>
            <fieldset>
                <legend>競争馬登録</legend>
                <div>
                    <label>馬名: <input type="text" /></label>
                </div>
                <div>
                    <label>馬主名: <input type="text" /></label>
                </div>
                <button>登録</button>
            </fieldset>
        </>
    );
};

export default AdminPage;
