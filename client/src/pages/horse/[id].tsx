import { FC } from "react";
import Head from "next/head";
import Link from "next/link";
import {
    HorseDataResponse,
    HorseDetail_Image_ImageType,
} from "../../../_proto/spec/v1/userdata_pb";
import { dateToYYYYMMDD } from "../../util/time";
import { raceOrderToString } from "../../util/util";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { JsonValue } from "@bufbuild/protobuf";
import { horseClient } from "../../util/client";
import styles from "../../styles/table.module.scss";

interface Params extends ParsedUrlQuery {
    id: string;
}

interface Props {
    json: JsonValue;
}

const imageTypeToString = (type: HorseDetail_Image_ImageType): string => {
    if (type === HorseDetail_Image_ImageType.GIF) {
        return "gif";
    } else if (type === HorseDetail_Image_ImageType.JPEG) {
        return "jpeg";
    } else if (type === HorseDetail_Image_ImageType.PNG) {
        return "png";
    }
    throw new Error("不正な拡張子です。");
};

const HorseDetailPage: FC<Props> = ({ json }) => {
    const data = HorseDataResponse.fromJson(json);
    const horse = data.horse!;
    return (
        <>
            <Head>
                <title>{`${horse.data!.name} | 調布競馬ポータル`}</title>
                <link rel="icon" href="/logo256.ico" />
            </Head>
            <h2>{horse.data!.name}</h2>
            {horse.image ? (
                <div>
                    <img
                        src={`data:image/${imageTypeToString(
                            horse.image.type
                        )};base64,${new TextDecoder().decode(
                            horse.image.data
                        )}`}
                        style={{ maxWidth: "100%" }}
                    />
                </div>
            ) : (
                ""
            )}
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
            <table className={styles.horseTable}>
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
    const res = await horseClient.allHorseData({});
    const paths = res.horses.map((horse) => `/horse/${horse.id}`);
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
    params,
}) => {
    const { id } = params as Params;
    const res = await horseClient.horseData({ id: +id });
    return {
        props: {
            json: res.toJson(),
        },
    };
};

export default HorseDetailPage;
