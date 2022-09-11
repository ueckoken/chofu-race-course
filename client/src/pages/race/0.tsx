import { FC } from "react";
import Link from "next/link";
import { RaceDataResponse } from "../../../_proto/spec/v1/userdata_pb";
import { dateToHHmm } from "../../util/time";

const res = new RaceDataResponse();
const raceData = res.race;

const RaceDetailPage: FC<{}> = () => {
    return (
        <>
            <h2>{`第${raceData!.order}競争 ${raceData!.name}`}</h2>
            <p>{raceData!.description}</p>
            <p>{`${dateToHHmm(raceData!.start!.toDate())}発走`}</p>
            <h3>出走馬</h3>
            <table>
                <tr>
                    <th>着順</th>
                    <th>馬番</th>
                    <th>馬名</th>
                    <th>オッズ</th>
                    <th>人気</th>
                </tr>
                {raceData!.member.map((e) => (
                    <tr>
                        <td>{e.result}</td>
                        <td>{e.order}</td>
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
            <h3>払い戻し</h3>
            <p>
                {`${raceData!.result!.order} ${raceData!.result!.horse!.name} ${
                    raceData!.result!.return
                }KEN`}
            </p>
        </>
    );
};

export default RaceDetailPage;
