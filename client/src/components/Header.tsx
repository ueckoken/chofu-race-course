import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

const Header: FC<{}> = () => {
    return (
        <header>
            <h1>
                <Image
                    src="/logo.png"
                    alt="調布競馬"
                    height="48px"
                    width="220.8px"
                />
            </h1>
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
