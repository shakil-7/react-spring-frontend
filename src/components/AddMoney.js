import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const AddMoney = ({senderEmail}) => {

    const [sender, setSender] = useState(senderEmail);
    const [receiver, setReceiver] = useState('');
    const [amount, setAmount] = useState(0);

    const [isPending, setIsPending] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const history = useHistory();

    const [errorMessage, setErrorMessage] = useState('');




    const handleSubmit = (e) => {
        e.preventDefault();
        const userInfo = { senderEmail, amount };
        setIsPending(true);

        setTimeout(() => {
            fetch("http://localhost:8080/add_money", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
                <label>Sender Phone Number</label>
                <input
                    type='text'
                    required
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                />

                {/* <label>Receiver Phone Number</label>
                <input
                    type='text'
                    required
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                /> */}

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
