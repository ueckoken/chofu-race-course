import { FC } from "react";
import Head from "next/head";
import Link from "next/link";
import { AllHorseDataResponse } from "../../_proto/spec/v1/userdata_pb";
import { GetStaticProps } from "next";
import { JsonValue } from "@bufbuild/protobuf";
import { horseClient } from "../util/client";

interface Props {
    json: JsonValue;
}

const HorsePage: FC<Props> = ({ json }) => {
    const data = AllHorseDataResponse.fromJson(json);
    return (
        <>
            <Head>
                <title>競争馬一覧 | 調布競馬ポータル</title>
                <link rel="icon" href="/logo256.ico" />
                <meta
                    name="og:image"
                    content="https://kra.azukibar.dev/ogp.png"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content="競争馬一覧 | 調布競馬ポータル"
                />
                <meta name="twitter:description" content="競争馬一覧ページ" />
            </Head>
            <h2>競争馬一覧</h2>
            <ul>
                {data!.horses
                    .sort((a, b) => a.id - b.id)
                    .map((horseData) => (
                        <li key={`horse${horseData.id}`}>
                            <Link href={`horse/${horseData.id}`}>
                                <a>{horseData.name}</a>
                            </Link>
                        </li>
                    ))}
            </ul>
        </>
    );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const res = await horseClient.allHorseData({});
    return {
        props: {
            json: res.toJson(),
        },
    };
};

export default HorsePage;
