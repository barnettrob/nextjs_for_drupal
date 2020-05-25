import Link from 'next/link'
// npm install --save isomorphic-unfetch
import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import PlaceholderSvg from '../placeholder-svg'

function EdbContent(props) {
    console.warn("data", props.data.data.nodeQuery.entities)
    return (
        <>
            <Head>
                <title>EDB React Bootstrap</title>
                <link rel="stylesheet" href="https://edb-ux.herokuapp.com/edb-ivory-css/bootstrap-tweaked-20200421.min.css"></link>
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
                            <Link as={''} href={`#`}>
                                <a className="text-dark stretched-link">{data.entityLabel}</a>
                            </Link>
                        </h3>
                        <p className="mb-0">{data.fieldAuthoredByRef.entity.entityLabel}</p>
                        <p className="mb-0 text-muted small">{data.body.summary}</p>
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


EdbContent.getInitialProps = async function () {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1OTA0MTM5NzQsImRydXBhbCI6eyJ1aWQiOiI0ODQyODEifX0.p2IA3KiU4nRqvQwMdBoMA_Rb9KKosvLy1MFzrZfdp-moYgcH6JNhJgml8gsQhlXMt1EKYIRjxxbVjUoaMA3P08WszSeGJ5zUV_QXGGonVs0VZiH8zg9RiNp1-tvK9B1NibDSA2OiLia_Xb7BAgT9It6Ioqgtd3IcceczLpYc7mprXd2R133j1QibmYmQEYIgs78SyZvutKULDxbqL5X2ixCixGSw29OMX-Nhs6fK2Q9X43mrREJQW6LmTtnIPaMpZTNbHi5dPrWe8opDN_CmtpyA4mLnu9n9c3xPLCORITu_zICVf-Tk9Iam-ppFzDBYK-Y9w5OCu-yFTv7_5MIjrw'
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

export default EdbContent
