import React, { useState } from 'react'

export const ForgetPassword = () => {

  const [email, setEmail] = useState();
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const resetPassword = {mobileNumber, email}

    fetch('http://localhost:8080/forgot_password',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resetPassword)
    }).then(response=>{
      return response.json();
    }).then(data => {
      console.log(data);
      console.log(data.token);
    }).catch(err => {

    });
    
    

    setFeedbackMessage('');


  };

  return (


    <div className="create">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label>Mobile Number</label>
        <input
          type='text'
          required
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />

        <label>Email Address</label>
        <input
          type='text'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!isPending && <button type='submit'>Send</button>}
        {isPending && <button type='button'>Sending...</button>}
      </form>

      <br />
      <h3>{feedbackMessage}</h3>

    </div>
  )
}
