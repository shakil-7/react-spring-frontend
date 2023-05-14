import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';


export const Navbar = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState('');
	const [jwtToken, setJwtToken] = useState('');

	useEffect(() => {
		if (Cookies.get('isLoggedIn') === 'true') {
			setIsLoggedIn(true);
			setCurrentUser(Cookies.get('currentUser'));
			setJwtToken(Cookies.get(currentUser + '#jwtToken'));
		}
		else {
			setIsLoggedIn(false);
		}
	}, []);

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
