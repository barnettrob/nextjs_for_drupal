import Link from 'next/link'
// npm install --save isomorphic-unfetch
import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import PlaceholderSvg from '../placeholder-svg'

function Tutorials(props) {
    console.warn("data", props.data.data.nodeQuery.entities)
    return (
        <>
            <Head>
                <title>EDB | Postgres Tutorials</title>
            </Head>
            <div className="container text-center my-0">
              <span className="img-fluid opacity-1">
                  <PlaceholderSvg />
              </span>
              <h1 className="balance-text">Postgres Tutorials</h1>
              <p className="text-muted balance-text">
                  This text supports the headline above. Donec id elit non mi porta gravida at eget metus.<br data-owner="balance-text"/>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed.
              </p>
            </div>
            <div className="container my-5">
              <div className="row">
                <div className="col-md-9 col-sm-12 mx-auto">
                <h2 className="text-sm-left text-center mb-4">Recent Tutorials</h2>  
            {
                props.data.data.nodeQuery.entities.map(data => (
                    <div key={data.entityId} className="d-flex align-items-center border-top position-relative py-4 flex-column flex-sm-row text-center text-sm-left">
                        <div className="py-2">
                        <h3 className="m-0"> 
                            <Link as={''} href={`/posts/tutorial-post?id=${data.entityId}`}>
                                <a className="text-dark stretched-link">{data.entityLabel}</a>
                            </Link>
                        </h3>
                        <p className="mb-0">{data.fieldAuthoredByRef.entity.entityLabel}</p>
                        <p className="mb-0 text-muted small">{data.body.summary.replace(/(<([^>]+)>)/ig,"")}</p>
                        <br />
                        </div>
                    </div>
                ))
            }
                </div>
            </div>
          </div>
        </>
    )
}

Tutorials.getInitialProps = async function () {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1OTA4NDI2NDAsImRydXBhbCI6eyJ1aWQiOiI0ODQyODEifX0.tnttgnORSjBvchgLVlMtOZpyldxI1ayVZQTTFNNqkT_2RP5dRZTWv9BjH1FsBBNTTZKr2F_qFI8rIY5n_jlsYnncqU_GsxRiypn6gBbKPf_zQ3MNXIc7Ua-Q85LxXZQN4OQQ2snEWuSSq-9oCW_GGljXgJ5zk96IWQ2Y13mWJHOYinRBt2hP263hDrgp1Uy7_inRkvcah22hNhXD9cmor2-Utr-ZQPd6gbduUsA7AhNwdh5aVWKVvmSq2h7FKv37fWm_GOIqku4sUDax8CjON6jXEs6kNefCzrjN_boMtw1VrRawxflrOCPncM2Ez62jNDshNfd0EB_Y8cCpQ-q9kg'
    //const res = await fetch('https://jsonplaceholder.typicode.com/todos')
    //const url 'http://uxteam:neo2020@redesign.docksal/jsonapi/node/tutorials_?page[limit]=10&filter[status][value]=1'
    const url = 'http://headless.docksal/graphql?queryId=a1e0b3f4019e514a581d765431ac078831357500:1'
    const res = await fetch(url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
    const data = await res.json();
    return {
        data
    }
}

export default Tutorials
