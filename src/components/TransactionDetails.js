import React from 'react';
import { useFetchUser } from './customHook/useFetchUser';


export const TransactionDetails = () => {

    const { data: transactions, isPending } = useFetchUser('http://localhost:8080/user/transaction');

    const handleClick = (mobileNumber) => {
        fetch('http://localhost:8080/user?mobileNumber=' + mobileNumber, {
            method: 'DELETE'
        }).then(() => {
            window.location.reload();
        });
    };


    return (
        <div className="blog-list blog-details">
            {
                isPending && <h2 className='blog-preview'> Loading... </h2>
            }

            {
                !isPending &&
                transactions.map(transaction => (
                    <div className="blog-list blog-preview" key={transaction.id} >
                        <p>Sender : <b>{transaction.sender}</b></p>
                        <p>Recipient : <b>{transaction.recipient}</b></p>
                        <p>Amount : <b>{transaction.amount}</b></p>
                    </div>
                ))

            }
        </div>
    )
}
