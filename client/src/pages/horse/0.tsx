import { FC } from "react";
import Link from "next/link";
import { HorseDataResponse } from "../../../_proto/spec/v1/userdata_pb";
import { dateToYYYYMMDD } from "../../util/time";

const res = new HorseDataResponse();
const horseData = res.horse;

const HorseDetailPage: FC<{}> = () => {
    if (!horseData) return <p>存在しないデータです。</p>;
    return (
        <>
            <h2>{horseData!.data!.name}</h2>
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
                    {horseData.histories.map((e) => (
                        <tr>
                            <td>{dateToYYYYMMDD(e.race!.start!.toDate())}</td>
                            <td>
                                <Link href={`/race/${e.race!.id}`}>
                                    <a>{e.race!.name}</a>
                                </Link>
                            </td>
                            <td>{/*e.popularity*/}</td>
                            <td>{e.result}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default HorseDetailPage;
