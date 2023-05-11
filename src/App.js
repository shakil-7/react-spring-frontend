
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { RegistrationForm } from './components/RegistrationForm';
import { AllUserList } from './components/AllUserList';
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

						<Route exact path='/all-user'>
							<AllUserList />
						</Route>

						<Route path='/user/:email'>
							<UserDetails />
						</Route>

					</Switch>



				</div>
			</div>



		</Router>
	);
}

export default App;
