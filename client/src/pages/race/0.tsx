import { FC } from "react";
import Link from "next/link";
import { RaceDetailData } from "../../types/api";
import { UNIXTimeToHHmm } from "../../util/time";

const raceData: RaceDetailData = {
    name: "レース1",
    description: "芝 4m",
    order: 1,
    isFinished: true,
    member: [
        {
            order: 1,
            result: 1,
            horse: {
                name: "タロー",
                id: 0,
            },
            odds: 2.0,
            popularity: 1,
        },
        {
            order: 2,
            result: 2,
            horse: {
                name: "ジロー",
                id: 1,
            },
            odds: 5.0,
            popularity: 2,
        },
    ],
    result: {
        horse: {
            name: "タロー",
            id: 0,
        },
        order: 1,
        return: 200,
    },
    stert: 0,
    voteBegin: 0,
    voteEnd: 0,
};

const RaceDetailPage: FC<{}> = () => {
    return (
        <>
            <h2>{`第${raceData.order}競争 ${raceData.name}`}</h2>
            <p>{raceData.description}</p>
            <p>{`${UNIXTimeToHHmm(raceData.stert)}発走`}</p>
            <h3>出走馬</h3>
            <table border="true">
                <tr>
                    <th>着順</th>
                    <th>馬番</th>
                    <th>馬名</th>
                    <th>オッズ</th>
                    <th>人気</th>
                </tr>
                {raceData.member.map((e) => (
                    <tr>
                        <td>{e.result}</td>
                        <td>{e.order}</td>
                        <td>
                            <Link href={`/horse/${e.horse.id}`}>
                                <a>{e.horse.name}</a>
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
                {`${raceData.result.order} ${raceData.result.horse.name} ${raceData.result.return}KEN`}
            </p>
        </>
    );
};

export default RaceDetailPage;
