import Link from "next/link";


export default function Nav({user}) {
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top py-3">
			  <div className="container">  
			    <a className="navbar-brand font-weight-bold" href="/">EDB</a>
			    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#edbNavbar" aria-controls="edb-navbar" aria-expanded="false" aria-label="Toggle navigation">
			      <span className="navbar-toggler-icon"></span>
			    </button>
			    <div className="collapse navbar-collapse" id="edbNavbar">

			      {/* left side */}
			      <ul className="navbar-nav mr-auto">

			        {/* why edb */}
			        <li className="nav-item dropdown">
			          <a className="nav-link text-nowrap font-weight-bolder px-xl-3 px-lg-2" href="#" data-toggle="dropdown">
			            Why EDB?
			            
			          </a>
			        </li>

			        {/* products */}
			        <li className="nav-item dropdown">
			          <a className="nav-link text-nowrap font-weight-bolder px-xl-3 px-lg-2" href="#" data-toggle="dropdown">
			            Products
			           
			          </a>
			          

			        </li>

			      {/* services */}
			        <li className="nav-item dropdown">
			          <a className="nav-link text-nowrap font-weight-bolder px-xl-3 px-lg-2" href="#" data-toggle="dropdown">
			            Services
			            
			          </a>
			        </li>

			      {/* support */}
			        <li className="nav-item dropdown">
			          <a className="nav-link text-nowrap font-weight-bolder px-xl-3 px-lg-2" href="#" data-toggle="dropdown">
			            Support
			            
			          </a>
			          
			        </li>

			      {/* resources */}
			        <li className="nav-item dropdown">
			          <a className="nav-link text-nowrap font-weight-bolder px-xl-3 px-lg-2" href="#" data-toggle="dropdown">
			            Resources
			            
			          </a>
			          
			        </li>

			        {/* plans */}
			        <li className="nav-item">
			          <a className="nav-link text-nowrap font-weight-bolder px-xl-3 px-lg-2" href="index.php?go=plans">Plans</a>
			        </li>

			      </ul>
			      
			      {/* right side */}
			      <ul className="navbar-nav">

			        {/* docs */}
			        <li className="nav-item">
			          <a className="nav-link text-nowrap font-weight-bolder small px-xl-3 px-lg-2" href="docs.php" target="_blank">Docs</a>
			        </li>

			        {/* contact */}
			        <li className="nav-item">
			          <a className="nav-link text-nowrap font-weight-bolder small px-xl-3 px-lg-2" href="index.php?go=contact">Contact</a>
			        </li>

			      {/* sign in */}
					{user && (
						<>
						<li className="nav-item">
							<Link href="/profile">
								<a className="nav-link text-nowrap font-weight-bolder small px-xl-3 px-lg-2">Profile</a>
							</Link>
						</li>
						<li className="nav-item">
							<Link href="/logout">
								<a className="nav-link text-nowrap font-weight-bolder small px-xl-3 px-lg-2" href="auth-sign-in.php">Sign Out</a>
							</Link>
						</li>
						</>
					)}
					{!user && (
						<li className="nav-item">
							<Link href="/login">
								<a className="nav-link text-nowrap font-weight-bolder small px-xl-3 px-lg-2" href={process.env.OKTA_ISSUER_URL}>Sign In</a>
							</Link>
						</li>
					)}
			      </ul>

			    </div>{/* /navbar-collapse */}

			  </div>{/* /container */}
			</nav>
		</>
	)
}