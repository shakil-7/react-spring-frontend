import Cookies from 'js-cookie';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const AddMoney = ({ senderMobileNumber }) => {

    const [sender, setSender] = useState(senderMobileNumber);
    const [receiver, setReceiver] = useState('');
    const [amount, setAmount] = useState(0);

    const [isPending, setIsPending] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const history = useHistory();

    const [errorMessage, setErrorMessage] = useState('');




    const handleSubmit = (e) => {
        e.preventDefault();
        const userInfo = { mobileNumber: sender, amount: amount };
        setIsPending(true);

        // var jwtToken = Cookies.get(senderMobileNumber + "#jwtToken");

        setTimeout(() => {
            fetch("http://localhost:8080/add_money", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${Cookies.get(senderMobileNumber + "#jwtToken")}`
                },
                body: JSON.stringify(userInfo)
            }).then(response => {
                if (!response.ok) {
                    response.json().then(res => {
                        setFeedbackMessage(res.message);
                    })
                    throw Error();
                }
                return response.json();
            }).then(data => {
                window.location.reload();
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
            <h2>Add Money</h2>
            <form onSubmit={handleSubmit}>
                <label>Your Mobile Number</label>
                <input
                    type='text'
                    required
                    defaultValue={sender}
                    readOnly
                // onChange={(e) => setSender(e.target.value)}
                />

                <label>Amount</label>
                <input
                    type='number'
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                {!isPending && <button type='submit'>Add</button>}
                {isPending && <button type='button'>Adding...</button>}
            </form>

        </div>
    )
}
