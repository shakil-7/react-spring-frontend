import React, { useEffect, useState } from 'react'
import { useFetchUser } from './customHook/useFetchUser';
import { Link } from 'react-router-dom';

export const AllUserList = () => {


  const { data: users, isPending } = useFetchUser('http://localhost:8080/all-user');

  const handleClick = (email) => {
    fetch('http://localhost:8080/user?email=' + email, {
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
            
            <Link to={ `/user/${user.email}` }>
              <h2>{user.name}</h2>
            </Link>
            <p>{user.email}</p>
            {/* <p>{user.gender}</p> */}
            <br/>
            <button onClick={()=>handleClick(user.email)}>
              <img src="" alt="Delete"></img>
            </button>
          </div>
        ))

      }
    </div>
  )
}
