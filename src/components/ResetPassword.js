import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import { useHistory, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

export const ResetPassword = () => {

  const history = useHistory();

  const { token } = useParams();
  const [newPassword, setNewPassword] = useState();
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(token);

    const resetPassword = { newPassword }
    // console.log(resetPassword);

    fetch('http://localhost:8080/reset-password/' + token, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resetPassword)
    }).then(response => {
      return response.json();
    }).then(data => {
      setFeedbackMessage(data.message);
      setTimeout(() => {
        setFeedbackMessage('');
        history.push('/login')
      }, 1000);
    }).catch(err => {
      console.log("error: " + err);
    });

    setFeedbackMessage('');

  };

  return (
    <div className="create">
      <h2>Set a New Password</h2>
      <form onSubmit={handleSubmit}>
        <label>New Password</label>
        <input
          type='text'
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {!isPending && <button type='submit'>Send</button>}
        {isPending && <button type='button'>Sending...</button>}
      </form>

      <br />
      <h3>{feedbackMessage}</h3>

    </div>
  )
}
