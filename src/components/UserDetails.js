import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AddMoney } from "./AddMoney";
import { NotFound } from "./NotFound";
import { SendMoney } from "./SendMoney";
import { TransactionDetails } from "./TransactionDetails";
import { useFetchUser } from "./customHook/useFetchUser";
import Cookies from 'js-cookie';

export const UserDetails = ({ setIsLoggedIn, currentUser, setCurrentUser }) => {


    const { mobileNumber } = useParams();
    const [isAddMoneyClicked, setIsAddMoneyClicked] = useState(0);
    const [isSendMoneyClicked, setIsSendMoneyClicked] = useState(0);
    const [transactionDetails, setTransactionDetails] = useState(0);

    const history = useHistory();
    const [addMoneyButton, setaddMoneyButton] = useState('Add Money');
    const [sendMoneyButton, setSendMoneyButton] = useState('Send Money');
    const [transactionDetailsButton, settransactionDetailsButton] = useState('Transaction Details');

    const { data: details, isPending, errorMessage } = useFetchUser(
        'http://localhost:8080/user?mobileNumber=' + mobileNumber,
        currentUser
    )

    const handleClick = (e) => {

        e.preventDefault();

        // console.log("delete");

        fetch('http://localhost:8080/user?mobileNumber=' + mobileNumber, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get(mobileNumber + "#jwtToken")}`
            }
        }).then(() => {
            setIsLoggedIn(false);
            // setCurrentUser('');
            history.push('/registration')
        });
    };

    const handleAddMoneyClick = (e) => {
        e.preventDefault();
        setIsAddMoneyClicked(isAddMoneyClicked ^ 1);
        if (isAddMoneyClicked) {
            setaddMoneyButton('Add Money');
        }
        else {
            setaddMoneyButton('Close');
        }
    };

    const handleSendMoneyClick = (e) => {
        e.preventDefault();
        setIsSendMoneyClicked(isSendMoneyClicked ^ 1);
        // console.log(isSendMoneyClicked);
        if (isSendMoneyClicked) {
            setSendMoneyButton('Send Money');
        }
        else {
            setSendMoneyButton('Close');
        }
    };

    const handleTransactionDetailsClick = (e) => {
        e.preventDefault();
        setTransactionDetails(transactionDetails ^ 1);
        // console.log(isSendMoneyClicked);
        if (transactionDetails) {
            settransactionDetailsButton('Transaction Details');
        }
        else {
            settransactionDetailsButton('Close');
        }
    };

    useEffect(()=>{
        console.log("current user " + currentUser)
        console.log("Token -> " + Cookies.get(currentUser + "#jwtToken"));
    },[])

    return (
        <div className="blog-details">

            {/* {setIsLoggedIn(true)}
            {setCurrentUser(mobileNumber)} */}

            {isPending && <div>Loading...</div>}
            {!isPending && (errorMessage.length > 0) && <div>{errorMessage}</div>}
            {!isPending &&
                (
                    <article>

                        {details.name && <h2>{details.name}</h2>}
                        {details.name && <p>Email : {details.email}</p>}
                        {details.name && <p>Account No: {details.accountNumber} </p>}
                        {details.name && <p>Mobile No: <b>{details.mobileNumber} </b> </p>}
                        {details.name && <p>Balance: <b className="bold_and_color">{details.balance}</b></p>}

                        {!details.name && <NotFound />}

                        <br />


                        {details.name && isSendMoneyClicked === 0 && transactionDetails === 0 && <button onClick={(e) => handleAddMoneyClick(e)}>{addMoneyButton}</button>}
                        {isAddMoneyClicked !== 0 && <AddMoney senderMobileNumber={details.mobileNumber} currentUser={currentUser}/>}

                        <span style={{
                            margin: 5
                        }}>

                        </span>
                        {details.name && isAddMoneyClicked === 0 && transactionDetails === 0 && <button onClick={(e) => handleSendMoneyClick(e)}>{sendMoneyButton}</button>}
                        {isSendMoneyClicked !== 0 && <SendMoney senderMobileNumber={details.mobileNumber} currentUser={currentUser}/>}


                        <span style={{
                            margin: 5
                        }}>

                        </span>

                        {details.name && isAddMoneyClicked === 0 && isSendMoneyClicked === 0 && <button onClick={(e) => handleTransactionDetailsClick(e)}>{transactionDetailsButton}</button>}
                        {transactionDetails !== 0 && <TransactionDetails mobileNumber={details.mobileNumber} currentUser={currentUser}/>}


                        <div style={{
                            color: 'red',
                            marginBottom: 100
                        }}> </div>


                        {details.name && <button onClick={(e) => { handleClick(e) }}>Delete</button>}
                    </article>
                )

            }
        </div>
    );
}
