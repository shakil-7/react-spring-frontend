import React, { useEffect } from 'react'

export const Logout = ({ setIsLoggedIn }) => {

  // useEffect(()=>{
  //   setIsLoggedIn(false);
  // })

  return (

    <div>
      {setIsLoggedIn(false)}
      Succesfully Log out
    </div>
  )
}

