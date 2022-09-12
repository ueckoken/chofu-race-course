import { FC } from "react";
import Link from "next/link";
import { dateToYYYYMMDD } from "../util/time";
import { RangeRaceDataResponse } from "../../_proto/spec/v1/userdata_pb";

const res = new RangeRaceDataResponse();

const RacePage: FC<{}> = () => {
    return (
        <>
            <h2>レース一覧</h2>
            <table>
                <thead>
                    <tr>
                        <th>年月日</th>
                        <th>競争</th>
                        <th>競争名</th>
                    </tr>
                </thead>
                <tbody>
                    {res.races.map((raceData) => (
                        <tr key={`race${raceData.id}`}>
                            <td>{dateToYYYYMMDD(raceData.start!.toDate())}</td>
                            <td>{raceData.order}</td>
                            <td>
                                <Link href={`/race/${raceData.id}`}>
                                    <a>{raceData.name}</a>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default RacePage;
