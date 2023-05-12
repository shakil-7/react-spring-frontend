import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const SendMoney = ({ senderEmail }) => {
    const [sender, setSender] = useState(senderEmail);
    const [receiver, setReceiver] = useState('');
    const [amount, setAmount] = useState(0);

    const [isPending, setIsPending] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const history = useHistory();

    const [errorMessage, setErrorMessage] = useState('');




    const handleSubmit = (e) => {
        e.preventDefault();
        const moneyTransfer = { senderEmail: sender, receiverEmail: receiver, amount: amount };
        setIsPending(true);

        setTimeout(() => {
            fetch("http://localhost:8080/send_money", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(moneyTransfer)
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
            <h2>Send Money</h2>
            <form onSubmit={handleSubmit}>
                <label>Your Mobile Number</label>
                <input
                    type='text'
                    required
                    defaultValue={sender}
                    readOnly
                // onChange={(e) => setSender(e.target.value)}
                />

                <label>Receiver Mobile Number</label>
                <input
                    type='text'
                    required
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                />

                <label>Amount</label>
                <input
                    type='number'
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                {!isPending && <button type='submit'>Send</button>}
                {isPending && <button type='button'>Send...</button>}
            </form>

            <p>{feedbackMessage}</p>

        </div>
    )
}
