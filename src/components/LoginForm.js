import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const LoginForm = () => {

    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const history = useHistory();

    const [errorMessage, setErrorMessage] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        const userLoginInfo = { mobileNumber, password };
        setIsPending(true);
        setTimeout(() => {
            fetch('http://localhost:8080/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userLoginInfo)
            }).then(response => {
                if (!response.ok) {
                    response.json().then(res => {
                        setFeedbackMessage(res.message);
                    })
                    throw Error();
                }
                return response.json();
            }).then(data => {
                history.push('/user/'.concat(mobileNumber));
                setIsPending(false);
            }).catch(err => {
                setIsPending(false);
                setTimeout(() => {
                    setFeedbackMessage('');
                }, 1000);
            });

        }, 500);
    };

    return (
        <div className="create">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Mobile Number</label>
                <input
                    type='text'
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                />

                <label>Password</label>
                <input
                    type='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {!isPending && <button type='submit'>Login</button>}
                {isPending && <button type='button'>Logging...</button>}
            </form>


            <h3>{feedbackMessage}</h3>

        </div>
    )
}
