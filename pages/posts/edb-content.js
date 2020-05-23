import Link from 'next/link'
// npm install --save isomorphic-unfetch
import fetch from 'isomorphic-unfetch'

function EdbContent(props) {
    console.warn("data", props.data.data.nodeQuery.entities)
    return (
        <>
            <h1>Fetch EDB Tutorials</h1>
            {
                props.data.data.nodeQuery.entities.map(data => (
                    <div key={data.entityId}>
                        <Link as={''} href={`#`}>
                            <a>{data.entityLabel}</a>
                        </Link>
                        <div>{data.fieldAuthoredByRef.entity.entityLabel}</div>
                        <div>{data.body.summary}</div>
                        <br />
                    </div>
                ))
            }
        </>
    )
}


EdbContent.getInitialProps = async function () {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1OTAyNDIxNTQsImV4cCI6MTU5MDI0NTc1NCwiZHJ1cGFsIjp7InVpZCI6IjQ4NDI4MSJ9fQ.v8waA2Ovj8LlVGeiISxkXKNXqiKSIBV2vmB1xk0X8RyLkymjHFPnf0tUITJO6GVS4xHDlEwN-svLybIOZPzWUuI39mwUpF9ecsmhK9gTaq-pbPmsNw67fHkhhoJQtCCbgoFj8Jl1DcLXNtaN5G95c4fgA9OsBKyKvipkpNKV0_V0EPGNWRHwNOKCISoZjQvoeadUsa1K0EOb78dR7qj-SfOgS1O6Th48tNBEOTcp_T3ga3yXlTpcn59vwt19RTtPrPHbW6NfJ8tJQTv-nTcH5vstHMNqzMDKu9SmAvpb6ORZnSYXd1uaBNC0bGAK7xsBs76w98iHq-DMHphuskwqmg'
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
