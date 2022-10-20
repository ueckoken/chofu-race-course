import { FC } from "react";
import Head from "next/head";
import Link from "next/link";
import { createPromiseClient } from "@bufbuild/connect-web";
import { transport } from "../util/use-client";
import { dateToYYYYMMDD } from "../util/time";
import { AllRaceDataResponse } from "../../_proto/spec/v1/userdata_pb";
import { GetStaticProps } from "next";
import { JsonValue } from "@bufbuild/protobuf";
import { RaceDataService } from "../../_proto/spec/v1/userdata_connectweb";

interface Props {
    json: JsonValue;
}

const RacePage: FC<Props> = ({ json }) => {
    const data = AllRaceDataResponse.fromJson(json);
    return (
        <>
            <Head>
                <title>レース一覧 | 調布競馬ポータル</title>
                <link rel="icon" href="/logo256.ico" />
                <meta name="og:image" content="/ogp.png" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
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
                    {data!.races
                        .sort(
                            (a, b) =>
                                a.start!.toDate().getTime() -
                                b.start!.toDate().getTime()
                        )
                        .map((raceData) => (
                            <tr key={`race${raceData.id}`}>
                                <td>
                                    {dateToYYYYMMDD(raceData.start!.toDate())}
                                </td>
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

export const getStaticProps: GetStaticProps<Props> = async () => {
    const client = createPromiseClient(RaceDataService, transport);
    const res = await client.allRaceData({});
    return {
        props: {
            json: res.toJson(),
        },
    };
};

export default RacePage;
