import { FC } from "react";
import Head from "next/head";
import Link from "next/link";
import { RaceDataResponse } from "../../../_proto/spec/v1/userdata_pb";
import { dateToHHmm, dateToYYYYMMDD } from "../../util/time";
import { raceOrderToString } from "../../util/util";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { JsonValue } from "@bufbuild/protobuf";
import { raceClient } from "../../util/client";

interface Params extends ParsedUrlQuery {
    id: string;
}

interface Props {
    json: JsonValue;
}

const RaceDetailPage: FC<Props> = ({ json }) => {
    const data = RaceDataResponse.fromJson(json);
    const race = data.race!;

    return (
        <>
            <Head>
                <title>{`${race.data!.name} | 調布競馬ポータル`}</title>
                <link rel="icon" href="/logo256.ico" />
                <meta
                    name="og:image"
                    content="https://kra.azukibar.dev/ogp.png"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content={`${race.data!.name} | 調布競馬ポータル`}
                />
                <meta
                    name="twitter:description"
                    content={`${race.data!.name}のデータ`}
                />
            </Head>
            <h2>{`第${race.data!.order}競争 ${race.data!.name}`}</h2>
            <p>{race.description}</p>
            <p>{`${dateToYYYYMMDD(race.data!.start!.toDate())} ${dateToHHmm(
                race.data!.start!.toDate()
            )}発走`}</p>
            <h3>出走馬</h3>
            <table>
                <thead>
                    <tr>
                        <th>着順</th>
                        <th>馬番</th>
                        <th>馬名</th>
                    </tr>
                </thead>
                <tbody>
                    {race.members.map((e, i) => (
                        <tr key={`horse${e.horse!.id}`}>
                            <td>{e.order ? raceOrderToString(e.order) : ""}</td>
                            <td>{i + 1}</td>
                            <td>
                                <Link href={`/horse/${e.horse!.id}`}>
                                    <a>{e.horse!.name}</a>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const res = await raceClient.allRaceData({});
    const paths = res.races.map((race) => `/race/${race.id}`);
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
    params,
}) => {
    const { id } = params as Params;
    const res = await raceClient.raceData({ id: +id });
    return {
        props: {
            json: res.toJson(),
        },
    };
};

export default RaceDetailPage;
