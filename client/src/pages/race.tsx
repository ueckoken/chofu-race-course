import { FC } from "react";
import Link from "next/link";
import { UNIXTimeToYYYYMMDD } from "../util/time";
import { RaceData } from "../types/api";

const raceDatas: RaceData[] = [
    {
        name: "レース1",
        id: 0,
        order: 1,
        start: 1664591400000,
    },
    {
        name: "レース2",
        id: 1,
        order: 2,
        start: 1664593200000,
    },
    {
        name: "レース1",
        id: 2,
        order: 1,
        start: 1664677800000,
    },
];

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
                    {raceDatas.map((raceData: RaceData) => (
                        <tr key={`race${raceData.id}`}>
                            <td>{UNIXTimeToYYYYMMDD(raceData.start)}</td>
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
