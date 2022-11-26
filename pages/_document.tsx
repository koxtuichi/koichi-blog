
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html lang="ja">
                <Head>
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
                    <link rel="manifest" href="/site.webmanifest"></link>
                    <meta name="msapplication-TileColor" content="#da532c" />
                    <meta name="theme-color" content="#ffffff" />

                    <meta property="og:url" content="https://diary.unronritaro.net" />
                    <meta property="og:type" content="website" />
                    <meta property="og:description" content="sugimoto shinji's photo" />
                    <meta property="og:site_name" content="SUGIMOTO SHINJI" />
                    <meta name="description" content="sugimoto shinji's photo" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
};

export default MyDocument;