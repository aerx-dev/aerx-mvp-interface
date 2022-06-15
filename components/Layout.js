import Header from "../components/Header";
import Head from "next/head";

export default function Layout({ children }) {
    return (
        <div>
            <Head>
                <title>aerx</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <Header />
            <main>{children}</main>
        </div>
    );
}
