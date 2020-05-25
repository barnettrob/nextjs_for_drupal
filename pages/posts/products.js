import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/layout'

export default function FirstPost() {
    return (
        <Layout>
            <Head>
                <title>Download EDB Postgres</title>
            </Head>
            <div className="container text-center my-0">
			    Download EDB Postgres
			  </div>
        </Layout>
    )
}