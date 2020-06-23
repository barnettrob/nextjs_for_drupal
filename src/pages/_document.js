// ./src/pages/_document.js

import React from 'react'
import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <link rel="stylesheet" href="https://edb-ux.herokuapp.com/edb-ivory-css/edb-ivory-bootstrap.min.css" />
                    <link
                        rel="prefetch"
                        href="/fonts/signika-vf.woff2"
                        type="font/woff2"
                        as="font"
                        crossOrigin=""
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <style jsx global>{`
                                @font-face {
                                    font-family: 'Signika';
                                    src: url('../fonts/signika-vf.woff2') format("woff");
                                  }
                            .opacity-1 {
                                opacity: .4
                            }
                      `}</style>
                </body>
            </Html>
        )
    }
}

export default MyDocument