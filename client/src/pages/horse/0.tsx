import { FC } from "react";
import Link from "next/link";
import { HorseDetailData } from "../../types/api";
import { UNIXTimeToYYYYMMDD } from "../../util/time";

const horseData: HorseDetailData = {
    name: "タロー",
    owner: "工研太郎",
    wins: 1,
    matches: 2,
    next: null,
    history: [
        {
            race: {
                name: "レース1",
                id: 0,
                order: 1,
                start: 0,
            },
            popularity: 1,
            result: 1,
        },
        {
            race: {
                name: "レース1",
                id: 2,
                order: 1,
                start: 0,
            },
            popularity: 1,
            result: 3,
        },
    ],
};

const HorseDetailPage: FC<{}> = () => {
    return (
        <>
            <h2>{horseData.name}</h2>
            <dl>
                <dt>馬主</dt>
                <dd>{horseData.owner}</dd>
                <dt>成績</dt>
                <dd>
                    {horseData.matches}戦{horseData.wins}勝
                </dd>
                <dt>次走</dt>
                <dd>
                    {horseData.next ? (
                        <Link href={`/race/${horseData.next.id}`}>
                            <a>{horseData.next.name}</a>
                        </Link>
                    ) : (
                        "未定"
                    )}
                </dd>
            </dl>
            <h3>出走レース</h3>
            <table>
                <thead>
                    <tr>
                        <th>年月日</th>
                        <th>競争名</th>
                        <th>人気</th>
                        <th>着順</th>
                    </tr>
                </thead>
                <tbody>
                    {horseData.history.map((e) => (
                        <tr>
                            <td>{UNIXTimeToYYYYMMDD(e.race.start)}</td>
                            <td>
                                <Link href={`/race/${e.race.id}`}>
                                    <a>{e.race.name}</a>
                                </Link>
                            </td>
                            <td>{e.popularity}</td>
                            <td>{e.result}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default HorseDetailPage;
