import { useParams, useHistory } from "react-router-dom";
import { useFetchUser } from "./customHook/useFetchUser";
import { NotFound } from "./NotFound";
import { AddMoney } from "./AddMoney";
import { useState } from "react";
import { Link } from "react-router-dom";

export const UserDetails = () => {

    const { email } = useParams();
    const [isAddMoneyClicked, setIsAddMoneyClicked] = useState(0);
    const history = useHistory();
    const [addMoneyButton, setaddMoneyButton] = useState('Add Money');

    const { data: details, isPending, errorMessage } = useFetchUser(
        'http://localhost:8080/user?email=' + email
    )

    const handleClick = () => {
        fetch('http://localhost:8080/user?email=' + email, {
            method: 'DELETE'
        }).then(() => {
            history.push('/all-user')
        });
    };

    const handleAddMoneyClick = () => {
        setIsAddMoneyClicked(isAddMoneyClicked^1);
        if(isAddMoneyClicked){
            setaddMoneyButton('Add Money');
        }
        else{
            setaddMoneyButton('Close');
        }
    };

    const handleSendMoneyClick = () => {

    };

    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {!isPending && (errorMessage.length > 0) && <div>{errorMessage}</div>}
            {!isPending &&
                (
                    <article>
                        <h2>{details.name}</h2>
                        <p>Email : {details.email}</p>
                        <p>Account No: {details.accountNumber} </p>
                        <p>Balance: <b className="bold_and_color">{details.balance}</b> </p>
                        {/* <div>{details.gender}</div> */}
                        {!details.name && <NotFound />}


                        <br />


                        {details.name && <button onClick={handleAddMoneyClick}>{addMoneyButton}</button>}
                        {isAddMoneyClicked != 0 && <AddMoney senderEmail={details.email}/>}


                        {/* <Link to={'/user/'.concat(details.email).concat("/add_money")}>
                            Add Money
                        </Link> */}


                        <div style={{
                            color: 'red',
                            marginBottom: 100
                        }}> </div>


                        {details.name && <button onClick={handleClick}>Delete</button>}
                    </article>
                )

            }
        </div>
    );
}
