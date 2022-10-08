import { FC, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useClient } from "../../util/use-client";
import { HorseDataResponse } from "../../../_proto/spec/v1/userdata_pb";
import { HorseDataService } from "../../../_proto/spec/v1/userdata_connectweb";
import { dateToYYYYMMDD } from "../../util/time";
import { raceOrderToString } from "../../util/util";

const HorseDetailPage: FC<{}> = () => {
    const router = useRouter();
    const { id } = router.query;
    const client = useClient(HorseDataService);
    const [data, setData] = useState<HorseDataResponse | null>(null);
    useEffect(() => {
        client.horseData({ id: +id! }).then((res) => setData(res));
    }, []);
    if (!data) return <p>読み込み中です。</p>;
    const horseData = data.horse!;
    return (
        <>
            <Head>
                <title>{`${horseData!.data!.name} | 調布競馬ポータル`}</title>
            </Head>
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
                        <tr key={`race${e.race!.id}`}>
                            <td>{dateToYYYYMMDD(e.race!.start!.toDate())}</td>
                            <td>
                                <Link href={`/race/${e.race!.id}`}>
                                    <a>{e.race!.name}</a>
                                </Link>
                            </td>
                            <td>{/*e.popularity*/}</td>
                            <td>{raceOrderToString(e.result!)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default HorseDetailPage;
