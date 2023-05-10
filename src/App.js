
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Demo } from './components/Demo';
import { Navbar } from './components/Navbar';
import { RegistrationForm } from './components/RegistrationForm';
import { AllUserList } from './components/AllUserList';

function App() {
  return (

    <Router>

      <Navbar />

      <div className="App">
        <Switch>

          <Router exact path='/'>
            <Demo />
          </Router>


          <Router exact path='/registration'>
            <RegistrationForm />
          </Router>

          <Router exact path='/all-user'>
            <AllUserList />
          </Router>

        </Switch>



      </div>

    </Router>
  );
}

export default App;
