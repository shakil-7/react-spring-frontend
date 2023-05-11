import React, { useState, useEffect } from 'react'

export const useFetchUser = (url) => {

	const [data, setData] = useState([]);
	const [isPending, setIsPending] = useState(true);

	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		// console.log(url);
		setTimeout(() => {
			fetch(url, {
				method: 'GET'
			}).then((response) => {
				if(!response.ok){
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
				console.log(err.message);
				setIsPending(false);
			})
		}, 100);

	}, [url])

	return { data, isPending, errorMessage}

}
