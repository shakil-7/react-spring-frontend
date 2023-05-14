import { Link } from 'react-router-dom';

export const Navbar = ({ isLoggedIn }) => {

	return (
		<nav className='navbar'>
			<Link to='/all-user'><h1>Bank</h1></Link>

			<div className="links">
				{isLoggedIn && <Link to='/all-user'>All Users</Link>}

				{!isLoggedIn && <Link to='/registration'>Sign Up</Link>}

				{isLoggedIn &&
					<Link to='/user/1'> Profile </Link>
				}

				{
					!isLoggedIn && <a href="/login" style={{
						color: 'white',
						backgroundColor: '#f1356d'
					}}>Login</a>
				}
				{
					isLoggedIn === true && <a href="/logout" style={{
						color: 'white',
						backgroundColor: '#f1356d'
					}}>Logout</a>
				}

			</div>
		</nav>
	)
}
