import Head from 'next/head'
import Nav from './nav'

function Layout({children, home}) {
	return (
		<>
			<Head>
			  <meta charSet="utf-8" />
			  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
			  <link rel="stylesheet" href="https://edb-ux.herokuapp.com/edb-ivory-css/edb-ivory-bootstrap.min.css" />
			</Head>
			<Nav />
			<main role="main">
				<section className="bg-white text-dark py-7">
						{children}
				</section>
				<style jsx global>{`
				@font-face {
					font-family: 'Signika';
					src: url('../fonts/signika-vf.woff2') format("woff");
				  }
			.opacity-1 {
				opacity: .4
			}
      `}</style>
			</main>
		</>	
		)
}

export default Layout