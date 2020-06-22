import Link from 'next/link'
import Head from 'next/head'
import Container from "react-bootstrap/Container";

export default function FirstPost() {
    return (
        <Container>
            <Head>
                <title>First Post</title>
            </Head>
            <h1>First Post</h1>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
        </Container>
    )
}