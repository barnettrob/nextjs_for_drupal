// ./src/pages/_app.js

import React from "react";
import App, { Container as NextContainer } from "next/app";
import Container from "react-bootstrap/Container"
import Head from "next/head";
import Nav from "../components/nav";
import '../components/marketo.css'

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        if (ctx.req && ctx.req.session.passport) {
            pageProps.user = ctx.req.session.passport.user;
        }
        return { pageProps };
    }

    constructor(props) {
        super(props);
        this.state = {
            user: props.pageProps.user
        };
    }

    render() {
        const { Component, pageProps } = this.props;

        const props = {
            ...pageProps,
            user: this.state.user,
        };

        return (
            <NextContainer>
                <Head>
                    <title>Thoughts!</title>
                </Head>
                <Nav user={this.state.user} />
                <Container>
                    <main role="main">
                        <section className="bg-white text-dark py-7">
                             <Component {...props} />
                        </section>
                    </main>
                </Container>
            </NextContainer>
        );
    }
}

export default MyApp;