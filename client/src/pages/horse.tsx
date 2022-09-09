import { FC } from "react";
import Link from "next/link";
import { HorseData } from "../types/api";

const horseDatas: HorseData[] = [
    {
        name: "タロー",
        id: 0,
    },
    {
        name: "ジロー",
        id: 1,
    },
];

const HorsePage: FC<{}> = () => {
    return (
        <>
            <h2>競争馬一覧</h2>
            <ul>
                {horseDatas.map((horseData: HorseData) => (
                    <li key={`race${horseData.id}`}>
                        <Link href={`horse/${horseData.id}`}>
                            <a>{horseData.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default HorsePage;
