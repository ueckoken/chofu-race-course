import { FC } from "react";
import Link from "next/link";
import { AllHorseDataResponse } from "../../_proto/spec/v1/userdata_pb";

const res = new AllHorseDataResponse();

const HorsePage: FC<{}> = () => {
    return (
        <>
            <h2>競争馬一覧</h2>
            <ul>
                {res.horses.map((horseData) => (
                    <li key={`race${horseData.id}`}>
                        <Link href={`horse/${horseData.id}`}>
                            <a>{horseData.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default HorsePage;
