import React from 'react';
import { Link } from 'react-router-dom';
import { useFetchUser } from './customHook/useFetchUser';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { NotFound } from './NotFound';

import { useHistory } from 'react-router-dom';

export const AllUserList = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [jwtToken, setJwtToken] = useState('');
  const history = useHistory();

  useEffect(() => {

    if (Cookies.get('isLoggedIn') !== 'true') {
      history.push('/notfound')
    }

    // console.log(isLoggedIn);
    // console.log(currentUser);
    // console.log(jwtToken);

  },[])


  const { data: users, isPending } = useFetchUser('http://localhost:8080/all-user',
    Cookies.get('currentUser')
  );

  const handleClick = (mobileNumber) => {

    fetch('http://localhost:8080/user?mobileNumber=' + mobileNumber, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get(currentUser + "#jwtToken")}`
      }
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="blog-list blog-details">
      {
        isPending && <h2 className='blog-preview'> Loading... </h2>
      }

      {
        !isPending &&
        users.map(user => (
          <div className="blog-list blog-preview" key={user.id} >

            <Link to={`/user/${user.mobileNumber}`}>
              <h2>{user.name}</h2>
            </Link>
            <p>Mobile No: {user.mobileNumber}</p>
            {/* <p>{user.gender}</p> */}
            <br />
            {/* <button onClick={() => handleClick(user.mobileNumber)}>
              <img src="" alt="Delete"></img>
            </button> */}
          </div>
        ))

      }
    </div>
  )
}
