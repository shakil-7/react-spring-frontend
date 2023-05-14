import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react'



export const useFetchUser = (url, currentUser) => {

	const [data, setData] = useState([]);
	const [isPending, setIsPending] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {

		// if(mobileNumber === undefined) {
		// 	mobileNumber = "-1";
		// }

		console.log("currentUser -> " + currentUser);

		// currentUser = "1";

		let jwtToken = Cookies.get(currentUser + "#jwtToken");
		console.log(Cookies.get(currentUser + "#jwtToken") === undefined)

		console.log("url : " + url)
		// jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIOiItMSIsImlhdCI6MTY4NDAzNzAxOCwiZXhwIjoxNjg0MDM4ODE4fQ.u9iPYuFptcPb3CifVxpjZoLnXP_FXN9qd8VBfdR7MVY";
		console.log('Bearer ' + jwtToken)

		// setJwtToken(Cookies.get('1'))
		// console.log(url);
		setTimeout(() => {
			fetch(url, {
				method: 'GET',
				mode: 'cors',
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${Cookies.get(currentUser + "#jwtToken")}`
				}
			}).then((response) => {
				if (!response.ok) {
					response.json().then((res) => {
						setErrorMessage(res.message);
					})
					throw Error(errorMessage);
				}
				return response.json();
			}).then((data) => {
				setData(data);
				setIsPending(false);
				// console.log(data);

				// console.log(data);
				// console.log(data.status, data.message);
			}).catch((err) => {
				// console.log(err.message);
				console.log("error")
				setIsPending(false);
			})
		}, 100);

	}, [url])

	return { data, isPending, errorMessage }

}
