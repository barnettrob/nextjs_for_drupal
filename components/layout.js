import Head from 'next/head'
import Nav from './nav'

function Layout({children, home}) {
	return (
		<>
			<Head>
			  <meta charset="utf-8" />
			  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
			  <link rel="stylesheet" href="https://edb-ux.herokuapp.com/edb-ivory-css/bootstrap-tweaked-20200421.min.css" />
			</Head>
			<Nav />
			<main role="main">
				<section className="bg-white border-bottom text-dark py-5">
						{children}
				</section>
			</main>
		</>	
		)
}

export default Layout