import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { HorseDataService } from "../../_proto/spec/v1/userdata_connectweb";
import { useClient } from "../util/use-client";
import { AllHorseDataResponse } from "../../_proto/spec/v1/userdata_pb";

const HorsePage: FC<{}> = () => {
    const client = useClient(HorseDataService);
    const [data, setData] = useState<AllHorseDataResponse>(
        new AllHorseDataResponse()
    );
    useEffect(() => {
        client.allHorseData({}).then((res) => setData(res));
    }, []);

    return (
        <>
            <h2>競争馬一覧</h2>
            <ul>
                {data.horses.map((horseData) => (
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
