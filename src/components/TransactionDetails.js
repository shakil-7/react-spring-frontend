import { useEffect, useState } from 'react';
import { useFetchUser } from './customHook/useFetchUser';
import { Table } from './Table';


export const TransactionDetails = ({ mobileNumber }) => {

    const { data: transactions, isPending } = useFetchUser('http://localhost:8080/user/transaction?mobileNumber=' + mobileNumber, mobileNumber);

    const [amount, setAmount] = useState('Low to High');

    const [tlist, setTlist] = useState([]);
    const [dlist, setDlist] = useState([]);

    const [firstTime, setFirstTime] = useState(true);

    const [displayTable, setDisplayTable] = useState();

    const handleSubmit = ((e) => {
        e.preventDefault();
        // console.log(tlist.length)

        setFirstTime(false);

        if (amount == 'Low to High') {
            dlist.sort((a, b) => {
                return parseFloat(a.amount) - parseFloat(b.amount);
            })
        }
        if (amount == 'High to Low') {
            dlist.sort((a, b) => {
                return parseFloat(b.amount) - parseFloat(a.amount);
            })
        }

        // dlist.forEach((d) => {
        //     console.log(d.amount + ' ' + d.otherParty)
        //     // process.stdout.write(d.amount + ' ')
        // })

        setDisplayTable(<Table dlist={dlist}></Table>)

    });


    return (
        <div className="blog-list blog-details">

            {
                tlist.length == 0 &&
                transactions.forEach(each => {
                    tlist.push(each)
                })
            }

            {
                dlist.length == 0 &&
                transactions.forEach(each => {
                    dlist.push(each)
                })
            }


            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Amount</label> <br />
                <select
                    value={amount}
                    onChange={(e) => {
                        setAmount(e.target.value)
                    }
                    }
                >
                    <option value='Low to High'>Low to High</option>
                    <option value='High to Low'>High to Low</option>
                </select>
                <br />
                <br />
                <button>
                    Submit
                </button>
            </form>

            <br />

            {
                firstTime && <Table dlist={dlist}></Table>
            }

            {
                displayTable
            }


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


// {/* <table>
// <tr>
//     <th>Date</th>
//     {/* <th>Sender</th> */}
//     <th>From/To</th>
//     <th>Amount <br></br>

//     </th>

// </tr>

// {dlist.map((val) => {
//     console.log(val.amount)
//     return (<tr>
//         <td>{val.date}</td>
//         <td>{val.otherParty}</td>
//         <td>{val.amount}</td>

//     </tr>)
// })}


// </table> */}

// {transactions.map((val, key) => {
//     // {val.type === '-'}
//     return (
//         <tr key={key}>
//             <td>{val.date}</td>
//             {/* <td>{val.sender}</td> */}
//             <td>{val.otherParty}</td>
//             <td>{val.amount}</td>
//             {/* <td>{val.type}</td> */}
//         </tr>
//     )
// })}