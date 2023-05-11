import React, { useEffect, useState } from 'react'
import { useFetchUser } from './customHook/useFetchUser';

export const AllUserList = () => {


  const { data: users, isPending } = useFetchUser('http://localhost:8080/all-user');

  return (
    <div className="blog-list">
        {
          isPending && <h2 className='blog-preview'> Loading... </h2>
        }

        {
          !isPending &&
          users.map(user => (
            <div className="blog-list blog-preview" key={user.id} >
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <p>{user.gender}</p>
            </div>
          ))

        }
    </div>
  )
}
