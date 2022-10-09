import { FC } from "react";
import Head from "next/head";
import Link from "next/link";
import { createPromiseClient } from "@bufbuild/connect-web";
import { HorseDataResponse } from "../../../_proto/spec/v1/userdata_pb";
import { HorseDataService } from "../../../_proto/spec/v1/userdata_connectweb";
import { dateToYYYYMMDD } from "../../util/time";
import { raceOrderToString } from "../../util/util";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { transport } from "../../util/use-client";
import { JsonValue } from "@bufbuild/protobuf";

interface Params extends ParsedUrlQuery {
    id: string;
}

interface Props {
    json: JsonValue;
}

const HorseDetailPage: FC<Props> = ({ json }) => {
    const data = HorseDataResponse.fromJson(json);
    const horse = data.horse!;
    return (
        <>
            <Head>
                <title>{`${horseData!.data!.name} | 調布競馬ポータル`}</title>
            </Head>
            <h2>{horse.data!.name}</h2>
            <dl>
                <dt>馬主</dt>
                <dd>{horse.owner}</dd>
                <dt>成績</dt>
                <dd>
                    {horse.matches}戦{horse.wins}勝
                </dd>
                <dt>次走</dt>
                <dd>
                    {horse.next ? (
                        <Link href={`/race/${horse.next.id}`}>
                            <a>{horse.next.name}</a>
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
                    {horse.histories.map((e) => (
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

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const client = createPromiseClient(HorseDataService, transport);
    const res = await client.allHorseData({});
    const paths = res.horses.map((horse) => `/horse/${horse.id}`);
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
    params,
}) => {
    const { id } = params as Params;
    const client = createPromiseClient(HorseDataService, transport);
    const res = await client.horseData({ id: +id });
    return {
        props: {
            json: res.toJson(),
        },
    };
};

export default HorseDetailPage;
