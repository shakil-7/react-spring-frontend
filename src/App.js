
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { AddMoney } from './components/AddMoney';
import { AllUserList } from './components/AllUserList';
import { LoginForm } from './components/LoginForm';
import { Navbar } from './components/Navbar';
import { RegistrationForm } from './components/RegistrationForm';
import { UserDetails } from './components/UserDetails';
import { useState } from 'react';
import { Logout } from './components/Logout';
import { NotFound } from './components/NotFound';
import { DeletePage } from './components/DeletePage';

import { NotAuthorizedPage } from './components/NotAuthorizedPage';

function App() {

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState('');


	return (

		<Router>

			<div className='App'>
				<Navbar isLoggedIn={isLoggedIn} />

				<div className="content">
					<Switch>

						<Route exact path='/registration'>
							<RegistrationForm />
						</Route>

						<Route exact path='/login'>
							<LoginForm setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />
						</Route>

						<Route exact path='/logout'>
							<Logout setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />
						</Route>

						<Route exact path='/all-user'>
							<AllUserList setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} />
						</Route>

						<Route exact path='/user/:mobileNumber'>
							<UserDetails setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser} />
						</Route>

						<Route exact path='/user/:email/add_money'>
							<AddMoney setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />
						</Route>

						<Route exact path='/notfound'>
							<NotFound />
						</Route>
						{/* <Route exact path='/notauthorized'>
							<NotAuthorizedPage />
						</Route> */}
						<Route exact path='/deletepage'>
							<DeletePage />
						</Route>

					</Switch>



				</div>
			</div>



		</Router>
	);
}

export default App;
