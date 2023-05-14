import { useFetchUser } from './customHook/useFetchUser';


export const TransactionDetails = ({mobileNumber}) => {

    const { data: transactions, isPending } = useFetchUser('http://localhost:8080/user/transaction?mobileNumber='  + mobileNumber, mobileNumber);

    return (
        <div className="blog-list blog-details">
            

            <table>
                <tr>
                    <th>Date</th>
                    {/* <th>Sender</th> */}
                    <th>From/To</th>
                    <th>Amount</th>
                </tr>
                
                {transactions.map((val, key) => {
                    // {val.type === '-'}
                    return (
                        <tr key={key}>
                            <td>{val.date}</td>
                            {/* <td>{val.sender}</td> */}
                            <td>{val.otherParty}</td>
                            <td>{ val.amount}</td>
                            {/* <td>{val.type}</td> */}
                        </tr>
                    )
                })}
            </table>

            {/* {
                !isPending &&
                transactions.map(transaction => (
                    <div className="blog-list blog-preview" key={transaction.id} >


                        <p>Sender : <b>{transaction.sender}</b></p>
                        <p>Recipient : <b>{transaction.recipient}</b></p>
                        <p>Amount : <b>{transaction.amount}</b></p>
                    </div>
                ))

            } */}
        </div>
    )
}
