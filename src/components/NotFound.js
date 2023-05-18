import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const NotFound = () => {


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [jwtToken, setJwtToken] = useState('');
  const reloadCount = sessionStorage.getItem('reloadCount');


  // useEffect(() => {

  //   if (Cookies.get('isLoggedIn') === 'true') {
  //     setIsLoggedIn(true);
  //   }
  //   setCurrentUser(Cookies.get('currentUser'));
  //   setJwtToken(Cookies.get(currentUser + '#jwtToken'));

  //   if (Cookies.get('isLoggedIn') === 'true') {
  //     setIsLoggedIn(true);

  //     Cookies.remove('isLoggedIn');
  //     Cookies.remove('currentUser');
  //     Cookies.remove(currentUser + '#jwtToken');
  //   }


  //   if (reloadCount < 1) {
  //     sessionStorage.setItem('reloadCount', String(reloadCount + 1));
  //     window.location.reload();
  //   } else {
  //     sessionStorage.removeItem('reloadCount');
  //   }
  // }, [])

  return (
    <div className='not-found'>
      <h2>Sorry</h2>
      <p> That page cannot be found </p>
    </div>
  )
}
