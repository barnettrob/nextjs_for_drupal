import Link from 'next/link'
// npm install --save isomorphic-unfetch
import fetch from 'isomorphic-unfetch'
// npm add graphql-request
import { GraphQLClient } from 'graphql-request'
import Head from 'next/head'
import PlaceholderSvg from '../placeholder-svg'
import BackSvg from '../back-svg'
import {withRouter} from 'next/router'

function TutorialPost(props) {
    console.warn("data", props.data)
    return (
        <>
            <>
            <Head>
                <title>EDB | Tutorial Node</title>
            </Head>
            <div className="container text-center my-0">
                <Link href="/posts/tutorials">
                    <a>
                        <span className="img-fluid opacity-1">
                            <PlaceholderSvg />
                        </span>
                    </a>
                </Link>
                    <h3 className="h1">
                        <Link href="/posts/tutorials">
                            <a className="text-dark">
                                Postgres Tutorials
                            </a>
                        </Link>
                    </h3>
                    <p className="ml-0 mb-3">
                    <Link href="/posts/tutorials">
                        <a className="d-block py-1 align-middle small text-dark">
                            <BackSvg />
                            Back
                        </a>
                    </Link>    
                </p>
            </div>
            
            <div className="container my-5">
              <div className="row">
                <div className="col-md-9 col-sm-12 mx-auto">
                    <h1 className="h2 text-center balance-text">
                        {props.data.nodeById.title}
                    </h1>
                    <p className="text-center">
                        {
                            props.data.nodeById.fieldPostgresqlTaxonomy.map(data => (
                                <span key={data.entity.entityLabel} className="badge badge-secondary mr-2">{data.entity.entityLabel}</span>
                            ))
                        }

                        {
                            props.data.nodeById.fieldExperienceLevelTaxonomy.map(data => (
                                <span key={data.entity.entityLabel} className="badge badge-secondary mr-2">{data.entity.entityLabel}</span>
                            ))
                        }
                    </p>
                    <p className="text-muted text-center balance-text mb-5">
                      {props.data.nodeById.fieldAuthoredByRef.entity.entityLabel}, {props.data.nodeById.fieldAuthoredByRef.entity.fieldJobTitle} · {props.data.nodeById.entityCreated}
                    </p>
                    <div dangerouslySetInnerHTML={{ __html: props.data.nodeById.body.value }} />
                </div>
            </div>
          </div>
          </>
        </>
    )
}

TutorialPost.getInitialProps = async function (withRouter) {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1OTA4NDI2NDAsImRydXBhbCI6eyJ1aWQiOiI0ODQyODEifX0.tnttgnORSjBvchgLVlMtOZpyldxI1ayVZQTTFNNqkT_2RP5dRZTWv9BjH1FsBBNTTZKr2F_qFI8rIY5n_jlsYnncqU_GsxRiypn6gBbKPf_zQ3MNXIc7Ua-Q85LxXZQN4OQQ2snEWuSSq-9oCW_GGljXgJ5zk96IWQ2Y13mWJHOYinRBt2hP263hDrgp1Uy7_inRkvcah22hNhXD9cmor2-Utr-ZQPd6gbduUsA7AhNwdh5aVWKVvmSq2h7FKv37fWm_GOIqku4sUDax8CjON6jXEs6kNefCzrjN_boMtw1VrRawxflrOCPncM2Ez62jNDshNfd0EB_Y8cCpQ-q9kg'
    const url = 'http://headless.docksal/graphql?queryId=1d091052448ada2d2b4ad3b494b938c37d97fd06:1'
    const query = `query nodeQuery($id:String!) {
        nodeById(id: $id, language:EN) {
          entityId,
          entityCreated(format: "M d, Y")
          status
          title
          entityRendered
          path {
            alias
          }
          ... on NodeTutorials {
            body {
              value
            }
            fieldAuthoredByRef {
              entity {
                entityLabel
                ... on NodeTeamMembers {
                  fieldJobTitle
                }
              }
            }
            fieldProgLangsTaxonomy {
              entity {
                entityLabel
              }
            }
                fieldPostgresqlTaxonomy {
              entity {
                entityLabel
              }
            }
            fieldFrameworksTaxonomy {
              entity {
                entityLabel
              }
            }
            fieldOracleMigrationTaxonomy {
              entity {
                entityLabel
              }
            }
            fieldExperienceLevelTaxonomy {
              entity {
                entityLabel
              }
            }
          }
        }
      }`

    const nid = withRouter.query.id  
    const variables = {
        id: `${nid}`
    }

    const graphQLClient = new GraphQLClient(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
    })

    const data = await graphQLClient.request(query, variables)

    return {
        data
    }
}

export default withRouter(TutorialPost)
