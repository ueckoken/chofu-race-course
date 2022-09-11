import { FC } from "react";
import Link from "next/link";
import {
    createConnectTransport,
    createPromiseClient,
} from "@bufbuild/connect-web";
import type { PartialMessage, Timestamp } from "@bufbuild/protobuf";
import { RaceDataService } from "../../_proto/spec/v1/userdata_connectweb";
import { RangeRaceDataResponse } from "../../_proto/spec/v1/userdata_pb";
import { dateToHHmm } from "../util/time";

const res = new RangeRaceDataResponse();

const TopPage: FC<{}> = () => {
    return (
        <>
            <h2>トップページ</h2>
            <h3>今日のレース</h3>
            <table>
                <thead>
                    <tr>
                        <th>競争</th>
                        <th>競争名</th>
                        <th>発走時刻</th>
                    </tr>
                </thead>
                <tbody>
                    {res.races.map((raceData) => (
                        <tr key={`race${raceData.id}`}>
                            <td>{raceData.order}</td>
                            <td>
                                <Link href={`/race/${raceData.id}`}>
                                    <a>{raceData.name}</a>
                                </Link>
                            </td>
                            <td>{dateToHHmm(raceData.start!.toDate())}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default TopPage;
