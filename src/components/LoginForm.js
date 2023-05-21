import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

export const LoginForm = () => {

    // const localStore

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

                Cookies.set(mobileNumber + "#jwtToken", data.jwtToken, { expires: 7 });
                Cookies.set("isLoggedIn", true, { expires: 7 });
                Cookies.set("currentUser", mobileNumber, { expires: 7 });


                localStorage.setItem('someData', "data....");
                
                history.push('/user/'.concat(mobileNumber));
                setIsPending(false);
            }).catch(err => {
                console.log(err);
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

            <br />

            <Link to='/forgot_password' style={{ textDecoration: 'none' }}>Forgot Password?</Link>


            <h3>{feedbackMessage}</h3>

        </div>
    )
}
