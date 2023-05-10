import React, { useEffect, useState } from 'react'

export const AllUserList = () => {

  // const [allUsers, setAllUsers] = useState([]);

  var allUsers = [];

  useEffect(() => {
    fetch('http://localhost:8080/all-user', {
      method: 'GET',
    }).then((response) =>{
      console.log(JSON.stringify(response.json()));
    }).then((response) =>{

    }).catch((error) => {

    });




    // console.log(allUsers);

    // fetch('http://localhost:8080/all-user', {
    //   method: 'GET',
    // }).then(response => {
    //   // console.log(response.json());
    //   // console.log(allUsers.length);
    //   while (allUsers.length) {
    //     allUsers.pop();
    //   }
    //   response.json().then((users) => {
    //     users.forEach(element => {
    //       if (element.hasOwnProperty('id')) {
    //         allUsers.push(element);
    //       }
    //       // console.log(element.hasOwnProperty('id'))
    //     });

    //     // console.log(allUsers);
    //     // setAllUsers(users);
    //     // console.log(typeof ({ ...allUsers }));
    //   });
    //   // console.log('return response')
    // })
    //   .catch(err => {
    //     console.log(err.message);
    //   });


    // // console.log(allUsers);

  }, []);

  return (
    <div className='blog-list'>
      All User List


    </div>
  )
}
