
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { AddMoney } from './components/AddMoney';
import { AllUserList } from './components/AllUserList';
import { LoginForm } from './components/LoginForm';
import { Navbar } from './components/Navbar';
import { RegistrationForm } from './components/RegistrationForm';
import { UserDetails } from './components/UserDetails';

function App() {
	return (

		<Router>

			<div className='App'>
				<Navbar />

				<div className="content">
					<Switch>


						<Route exact path='/registration'>
							<RegistrationForm />
						</Route>

						<Route exact path='/login'>
							<LoginForm />
						</Route>

						<Route exact path='/all-user'>
							<AllUserList />
						</Route>

						<Route exact path='/user/:mobileNumber'>
							<UserDetails />
						</Route>

						<Route exact path='/user/:email/add_money'>
							<AddMoney />
						</Route>

					</Switch>



				</div>
			</div>



		</Router>
	);
}

export default App;
