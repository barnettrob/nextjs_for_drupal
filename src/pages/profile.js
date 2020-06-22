// ./src/pages/profile.js

import Head from 'next/head'

function Profile({ user }) {
    return (
        <>
            <Head>
                <title>User Profile</title>
            </Head>
            <div>
                <h2>
                   Welcome!!!
                </h2>
                <p>This is what we know about you:</p>
                <ul>
                    <li>
                        Username: {user.username}
                    </li>
                    <li>
                        Email Id: {user.federationid}
                    </li>
                    {/*{ Object.keys(user).map(key => (*/}
                        {/*<li key={key}>{key}: {user[key].toString()}</li>*/}
                    {/*))}*/}
                </ul>
            </div>
        </>
    );
}

export default Profile;