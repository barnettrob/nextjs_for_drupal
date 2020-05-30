import Head from 'next/head'
import { getSortedPostsData } from '../lib/posts'
import Layout from '../components/layout'

export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}

export default function Home({ allPostsData }) {
  return (
      <Layout>
          <Head>
              <title>EDB Postgres</title>
          </Head>
          <div className="container">
            <div className="row my-5 d-flex align-items-center">
              <div className="col-lg my-4 text-center text-lg-left">
                <h1 className="balance-text">Get the most from Postgres</h1>
                <p className="lead text-muted balance-text">Products, services, and support to help you control<br data-owner="balance-text" />database risk, manage costs, and scale efficiently</p>
                <a className="btn btn-primary px-4 mr-2" href="#" role="button">Download</a>
                <a className="btn btn-primary px-4 mr-2" href="/posts/tutorials" role="button">Postgres Tutorials</a>
                <a className="btn btn-primary px-4 mr-2" href="/posts/blog-posts" role="button">Blog Posts</a>
                <a className="btn btn-primary px-4" href="#" role="button">Learn More</a>
              </div>
            </div>
          </div>
      </Layout>
  )
}
