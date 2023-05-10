import { Link } from 'react-router-dom';

export const Navbar = () => {
	return (
		<nav className='navbar'>
			<h1>Bank</h1>
			<div className="links">
				<Link to='/all-user'>All Users</Link>
				<Link to='/registration'>Sign Up</Link>

				<a href="/login" style={{
					color: 'white',
					backgroundColor: '#f1356d'
				}}>Login</a>
			</div>
		</nav>
	)
}
