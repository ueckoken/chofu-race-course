import { FC } from "react";
import Link from "next/link";
import Head from "next/head";

const SpecialPage: FC<{}> = () => {
    const data = [
        {
            order: 1,
            name: "ラズリアンクロス",
            id: 9,
            point: 12,
        },
        {
            order: 2,
            name: "バックフリップ",
            id: 12,
            point: 12,
        },
        {
            order: 2,
            name: "ブツガイサイサイリ",
            id: 19,
            point: 12,
        },
        {
            order: 4,
            name: "サクラモッチリーン",
            id: 7,
            point: 7,
        },
        {
            order: 4,
            name: "ネイバオキリコミ",
            id: 2,
            point: 7,
        },
        {
            order: 6,
            name: "エレファンススズカ",
            id: 15,
            point: 6,
        },
        {
            order: 6,
            name: "オーバートップ",
            id: 20,
            point: 6,
        },
        {
            order: 8,
            name: "オナマエシール",
            id: 11,
            point: 5,
        },
        {
            order: 9,
            name: "キウイオイシカッタ",
            id: 14,
            point: 3,
        },
        {
            order: 10,
            name: "ライラックアロー",
            id: 10,
            point: 2.5,
        },
        {
            order: 11,
            name: "エイシャオラー",
            id: 3,
            point: 2,
        },
        {
            order: 11,
            name: "オゼハカイザイダン",
            id: 8,
            point: 2,
        },
        {
            order: 11,
            name: "オタクカエルヨー",
            id: 4,
            point: 2,
        },
        {
            order: 14,
            name: "ウタサンブラック",
            id: 18,
            point: 2,
        },
        {
            order: 14,
            name: "ハリボテエレジー",
            id: 6,
            point: 2,
        },
        {
            order: 14,
            name: "レモナーノナレハテ",
            id: 1,
            point: 2,
        },
    ];
    return (
        <>
            <Head>
                <title>新馬王戦 | 調布競馬ポータル</title>
            </Head>
            <h2>新馬王戦</h2>
            <h3>日程</h3>
            <table>
                <tbody>
                    <tr>
                        <td>2022年10月7日</td>
                        <td>レース1日目</td>
                    </tr>
                    <tr>
                        <td>2022年10月14日</td>
                        <td>レース2日目</td>
                    </tr>
                    <tr>
                        <td>2022年10月21日</td>
                        <td>レース3日目</td>
                    </tr>
                    <tr>
                        <td>2022年10月28日</td>
                        <td>レース最終日/表彰/エキシビジョンレース</td>
                    </tr>
                </tbody>
            </table>
            <h3>ランキング</h3>
            <p>1日目終了時点</p>
            <table>
                <thead>
                    <tr>
                        <th>順位</th>
                        <th>馬名</th>
                        <th>レート</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((e) => (
                        <tr key={`horse-${e.id}`}>
                            <td>{e.order}</td>
                            <td>
                                <Link href={`../horse/${e.id}`}>
                                    <a>{e.name}</a>
                                </Link>
                            </td>
                            <td>{e?.point}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>合計点の平均をレートとする。着順ごとの獲得点は以下の通り。</p>
            <table>
                <thead>
                    <tr>
                        <th>頭数</th>
                        <th>1着</th>
                        <th>2着</th>
                        <th>3着</th>
                        <th>4着</th>
                        <th>中止</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>4頭</td>
                        <td>12点</td>
                        <td>6点</td>
                        <td>4点</td>
                        <td>3点</td>
                        <td>2点</td>
                    </tr>
                    <tr>
                        <td>3頭</td>
                        <td>12点</td>
                        <td>5点</td>
                        <td>3点</td>
                        <td></td>
                        <td>2点</td>
                    </tr>
                    <tr>
                        <td>2頭</td>
                        <td>12点</td>
                        <td>3点</td>
                        <td></td>
                        <td></td>
                        <td>2点</td>
                    </tr>
                    <tr>
                        <td>1頭</td>
                        <td>12点</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>2点</td>
                    </tr>
                </tbody>
            </table>
            <p>同着の場合は1つ下の順位の得点との平均を取る。</p>
            <h3>表彰</h3>
            <p>
                全てのレースが終了した時点で3レース以上出走しているうち、最も得点が高い馬を新馬王として表彰する。
            </p>
        </>
    );
};

export default SpecialPage;
