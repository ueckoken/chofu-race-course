import { FC } from "react";
import Link from "next/link";
import { RaceDataResponse } from "../../../_proto/spec/v1/userdata_pb";
import { dateToHHmm } from "../../util/time";
import { raceOrderToString } from "../../util/util";

const res = new RaceDataResponse();
const raceData = res.race;

const RaceDetailPage: FC<{}> = () => {
    if (!raceData) return <p>存在しないデータです。</p>;
    return (
        <>
            <h2>{`第${raceData!.data!.order}競争 ${raceData!.data!.name}`}</h2>
            <p>{raceData!.description}</p>
            <p>{`${dateToHHmm(raceData!.data!.start!.toDate())}発走`}</p>
            <h3>出走馬</h3>
            <table>
                <tr>
                    <th>着順</th>
                    <th>馬番</th>
                    <th>馬名</th>
                    <th>オッズ</th>
                    <th>人気</th>
                </tr>
                {raceData!.members.map((e) => (
                    <tr key={`horse${e.horse!.id}`}>
                        <td>{raceOrderToString(e.order!)}</td>
                        <td>
                            <Link href={`/horse/${e.horse!.id}`}>
                                <a>{e.horse!.name}</a>
                            </Link>
                        </td>
                        <td>
                            {Number.isInteger(e.odds) ? `${e.odds}.0` : e.odds}
                        </td>
                        <td>{e.popularity}</td>
                    </tr>
                ))}
            </table>
        </>
    );
};

export default RaceDetailPage;
