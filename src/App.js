
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { RegistrationForm } from './components/RegistrationForm';
import { AllUserList } from './components/AllUserList';
import { UserDetails } from './components/UserDetails';
import { LoginForm } from './components/LoginForm';
import { AddMoney } from './components/AddMoney';

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

						<Route exact path='/user/:email'>
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
