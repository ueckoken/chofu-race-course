import { FC } from "react";
import Head from "next/head";
import Link from "next/link";
import { createPromiseClient } from "@bufbuild/connect-web";
import { transport } from "../util/use-client";
import { HorseDataService } from "../../_proto/spec/v1/userdata_connectweb";
import { AllHorseDataResponse } from "../../_proto/spec/v1/userdata_pb";
import { GetStaticProps } from "next";
import { JsonValue } from "@bufbuild/protobuf";

interface Props {
    json: JsonValue;
}

const HorsePage: FC<Props> = ({ json }) => {
    const data = AllHorseDataResponse.fromJson(json);
    return (
        <>
            <Head>
                <title>競争馬一覧 | 調布競馬ポータル</title>
            </Head>
            <h2>競争馬一覧</h2>
            <ul>
                {data!.horses.map((horseData) => (
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
    const client = createPromiseClient(HorseDataService, transport);
    const res = await client.allHorseData({});
    return {
        props: {
            json: res.toJson(),
        },
    };
};

export default HorsePage;
