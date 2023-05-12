import React from 'react';
import { Link } from 'react-router-dom';
import { useFetchUser } from './customHook/useFetchUser';

export const AllUserList = () => {


  const { data: users, isPending } = useFetchUser('http://localhost:8080/all-user');

  const handleClick = (mobileNumber) => {
    fetch('http://localhost:8080/user?mobileNumber=' + mobileNumber, {
        method: 'DELETE'
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
            
            <Link to={ `/user/${user.mobileNumber}` }>
              <h2>{user.name}</h2>
            </Link>
            <p>{user.email}</p>
            {/* <p>{user.gender}</p> */}
            <br/>
            <button onClick={()=>handleClick(user.mobileNumber)}>
              <img src="" alt="Delete"></img>
            </button>
          </div>
        ))

      }
    </div>
  )
}
