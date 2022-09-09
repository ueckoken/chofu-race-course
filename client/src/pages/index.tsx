import { FC } from "react";
import Link from "next/link";
import { UNIXTimeToHHmm } from "../util/time";
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
];

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
                    {raceDatas.map((raceData: RaceData) => (
                        <tr key={`race${raceData.id}`}>
                            <td>{raceData.order}</td>
                            <td>
                                <Link href={`/race/${raceData.id}`}>
                                    <a>{raceData.name}</a>
                                </Link>
                            </td>
                            <td>{UNIXTimeToHHmm(raceData.start)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default TopPage;
