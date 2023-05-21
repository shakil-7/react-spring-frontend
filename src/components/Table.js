import React from 'react'

export const Table = ({ dlist }) => {
    return (
        <table>
            <tr>
                <th>Date</th>
                {/* <th>Sender</th> */}
                <th>From/To</th>
                <th>Amount <br></br>

                </th>

            </tr>

            {dlist.map((val) => {
                console.log(val.amount)
                return (<tr>
                    <td>{val.date.substring(0,17)}</td>
                    <td>{val.otherParty}</td>
                    <td>{val.amount}</td>

                </tr>)
            })}


        </table>
    )
}
