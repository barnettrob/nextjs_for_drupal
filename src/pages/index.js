import Head from 'next/head'
import Container from "react-bootstrap/Container"
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}

function Home({ allPostsData }) {

  const handleSubmit = (e) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    //myHeaders.append("Access-Control-Allow-Origin", "*");
    //myHeaders.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PATCH, DELETE");
    //myHeaders.append("Access-Control-Allow-Headers", "Authorization");
    
    var raw = JSON.stringify({
      "name": "mistermagoo20200513",
      "pass": "1Edbpassword#"
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://dev.enterprisedb.com/user/login?_format=json", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }  

  return (
      <Container>
          <Head>
              <title>EDB Postgres</title>
          </Head>
          <div className="container">
              <div className="row my-5 d-flex align-items-center">
                  <div className="col-lg my-4 text-center text-lg-left">
                      <h1 className="balance-text">Get the most from Postgres</h1>
                      <p className="lead text-muted balance-text">Products, services, and support to help you control<br data-owner="balance-text" />database risk, manage costs, and scale efficiently</p>
                      <a className="btn btn-primary px-4 mr-2" href="#" role="button" onClick={handleSubmit}>Download</a>
                      <a className="btn btn-primary px-4 mr-2" href="/posts/tutorials" role="button">Postgres Tutorials</a>
                      <a className="btn btn-primary px-4 mr-2" href="/posts/blog-posts" role="button">Blog Posts</a>
                      <a className="btn btn-primary px-4" href="/contact" role="button">Contact</a>
                  </div>
              </div>
          </div>
      </Container>
  )
}

export default Home;
