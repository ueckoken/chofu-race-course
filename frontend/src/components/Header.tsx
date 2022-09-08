import { FC } from "react";
import Link from "next/link";

const Header: FC<{}> = () => {
    return (
        <header>
            <h1>調布競馬ポータル</h1>
            <nav>
                <ul>
                    <li>
                        <Link href="/">
                            <a>TOP</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/race">
                            <a>レース</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/horse">
                            <a>競争馬</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
