import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const Logout = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState('');
	const [jwtToken, setJwtToken] = useState('');


  useEffect(()=>{

    if(Cookies.get('isLoggedIn') === 'true'){
			setIsLoggedIn(true);
		}
		setCurrentUser(Cookies.get('currentUser'));
		setJwtToken(Cookies.get(currentUser + '#jwtToken'));

    if(Cookies.get('isLoggedIn') === 'true'){
			setIsLoggedIn(true);

      Cookies.remove('isLoggedIn');
      Cookies.remove('currentUser');
      Cookies.remove(currentUser + '#jwtToken');
		}
  })

  return (

    <div>
      
      Succesfully Log out
      {
        localStorage.getItem('someData')
      }
    </div>
  )
}

