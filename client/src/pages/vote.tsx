import { FC } from "react";
import Head from "next/head";

const VotePage: FC<{}> = () => {
    return (
        <>
            <Head>
                <title>投票所 | 調布競馬ポータル</title>
                <link rel="icon" href="/logo256.ico" />
                <meta
                    name="og:image"
                    content="https://kra.azukibar.dev/ogp.png"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="調布競馬ポータル" />
                <meta name="twitter:description" content="調布競馬公式サイト" />
            </Head>
            <h2>投票</h2>
            <p>準備中</p>
        </>
    );
};

export default VotePage;
