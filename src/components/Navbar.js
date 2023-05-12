import { Link } from 'react-router-dom';

export const Navbar = () => {
	return (
		<nav className='navbar'>
			<Link to='/all-user'><h1>Bank</h1></Link>
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
