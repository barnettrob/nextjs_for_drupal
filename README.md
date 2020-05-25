This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Drupal 8/9 Integration
### This uses GraphQL to serve data from Drupal
This tutorial a nice overview for the getting Next.Js working with REST json<br/>
We are going to use GraphQL instead, but it is still worth watching<br/>
https://www.youtube.com/watch?v=a-6O6KI9c48


####Drupal side setup:<br/>
* Install graphql module https://www.drupal.org/project/graphql and enable “GraphQL” and “GraphQL Core” modules.<br/>
Ran into issue with metatag module error and javascript error thrown in graphql explorer in Drupal due to layout builder, so here is how to solve these issues:
1. Need Metatag patch:<br/>
https://www.drupal.org/files/issues/2020-05-04/2980299-64.patch
2. GraphQL's module after install at page "/graphql/explorer" throws this Javascript error:
3. `Uncaught TypeError: Cannot read property '__schema' of undefined`
4. To resolve this, you need to uninstall layout_builder and layout_discovery
5. This is a pain, because you have to turn off all of the content types using layout builder and then try to uninstall.  This led to the fields not getting deleted properly so I had to go into the database and run:
6. `delete from key_value where name LIKE '%deleted%';`
7. Now, uninstall layout_builder and layout_discovery
    * Now, breath again…
8. To try out graphql queries, go to /graphql/explorer in drupal (navigate to Configuration > Web Services > GraphQL > Schemas > Explorer).
9. The Graphql endpoint to be used by your React app will be /graphql…..
10. BUT FIRST, you need to set up query maps in Drupal.
    1. /admin/config/graphql/query-maps/config
    https://www.drupal.org/docs/8/modules/graphql/query-maps
        1. On your Mac, run:<br/>
`npm install -g persistgraphql`
        2. Create a directory on our Mac to store query maps.  Can be anywhere.  For this example, let’s say the directory name is graphql_drupal_queries
        3. Make another directory called graphql_drupal_query_maps to store the generated maps.
        4. Copy what you created for the GraphQL query in the explorer page in Drupal to a file inside the directory from #2 with the .graphql file extension.  So, for example, tutorials_list.graphql
        5. Run: `persistgraphql graphql_drupal_queries/ path/to/graphql_drupal_query_maps/output.json`
            1. See usage:<br/>
            https://github.com/apollographql/persistgraphql<br/>
            ```Should do something like:<br/>
            Crawling graphql_drupal_queries/...
            Wrote output file to /Users/robert.barnett/Documents/graphql_drupal_query_maps/output.json.
        6. Find output.json and import on<br/>
           /admin/config/graphql/query-maps/config<br/>
        7. Once imported, it will show a hash, and you can inspect it.  
        8. Graphql endpoint will be: `/graphql?queryId=[hash]:[ID]`
            ID can be seen when you inspect the query map<br/>
            http://mydrupalsite/graphql?queryId=0e2f6a04e07691141f9bdc235f959d055f34c6c1:1
11. <b>Authentication</b> for GraphQL endpoints in Drupal
    1. Install jwt module (https://www.drupal.org/project/jwt)
        1. Because jwt token expires by default, use dev version
            1. `composer require drupal/jwt:1.x-dev`
            2. Apply patch that makes token expiration configurable
                1. https://www.drupal.org/project/jwt/issues/2782571
                    1. https://www.drupal.org/files/issues/2019-09-24/2782571-11.patch        
    2. Generate a JWT RSA Key (follow instructions on jwt project page above)
    3. Create a folder at the root of the Drupal project called jwt_key
    4. cd into jwt_folder and chmod 600 jwt.key.txt
    5. Go to the JWT Authentication config page and choose key you just created.
        1. At this config page: /admin/config/system/jwt, "create a new key" link
            1. JWT Expiration (minutes): 0
            2. In create a new key page, add the key:
                1. Give it a name
                2. Key type: JWT RSA Key
                3. Key provider: File
                4. File path: /var/www/jwt_key/jwt.key.txt
            3. Go back to JWT configuration page: /admin/config/system/jwt
                1. Algorithm: RSASSA-PKCS1…..
                2. Private Key: select key just created (by name)
                3. Save configuration
            4. Next follow media current's article below:<br/>
                https://www.mediacurrent.com/blog/using-json-web-tokens-jwt-authenticate-requests-rest-resources-drupal-8/
                1. But basically, need to enable some more modules:<br/>
                    1. drush en jwt_auth_consumer jwt_auth_issuer -y
                    2. Install RESTUI as well and enable it, and then enable
                        1. /admin/config/services/rest
                        2. Enable Query Map<br/>
                            `(/entity/graphql_query_map/{graphql_query_map}: GET`
                            1. Accepted requestformats: json
                            2. Authentication providers: jwt_auth and cookie
                            3. Get token to plugin into Next.js app:
                                1. http://mydrupalsite/jwt/token
                                2. Copy token value
12. <b>In Next.js app</b> edb-content.js file or whatever the file name is, the fetch call should look something like this:<br/>
```	const token = 'TOKEN VALUE PASTED HERE'
   	const res = await fetch(url, {
       	method: 'get',
       	headers: {
           	'Content-Type': 'application/json',
           	Authorization: `Bearer ${token}`,
       	},
   	})
```      
