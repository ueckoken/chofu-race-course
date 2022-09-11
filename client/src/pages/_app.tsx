import { FC } from "react";
import { AppProps } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Hooter";

const App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
            <Header />
            <main>
                <Component {...pageProps} />
            </main>
            <Footer />
        </>
    );
};

export default App;
