import { FC } from "react";
import Head from "next/head";
import Link from "next/link";

const TopPage: FC<{}> = () => {
    return (
        <>
            <Head>
                <title>調布競馬ポータル</title>
                <link rel="icon" href="/logo256.ico" />
                <meta
                    name="og:image"
                    content="https://kra.azukibar.dev/ogp.png"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="調布競馬ポータル" />
                <meta name="twitter:description" content="調布競馬公式サイト" />
            </Head>
            <h2>開催情報</h2>
            <p>
                第1回調布競馬「新馬王戦(
                <Link href="/special/shinbao">
                    <a>特設サイト</a>
                </Link>
                )」(10月7日から10月28日)
            </p>
            <h2>概要</h2>
            <p>
                電気通信大学工学研究部内のグループ「工学研究競馬会」が技術の向上や他サークルとの交流を目的に開催しています。
            </p>
            <h2>外部リンク</h2>
            <ul>
                <li>
                    <a
                        href="https://twitter.com/ueckoken"
                        target="_blank"
                        rel="noreferrer"
                    >
                        電気通信大学 工学研究部 Twitter
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.youtube.com/user/kokenuser"
                        target="_blank"
                        rel="noreferrer"
                    >
                        電気通信大学 工学研究部 YouTube
                    </a>
                </li>
            </ul>
        </>
    );
};

export default TopPage;
