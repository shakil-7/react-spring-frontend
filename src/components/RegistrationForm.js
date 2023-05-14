import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const RegistrationForm = () => {

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [mobileNumber, setMobileNumber] = useState('');
	const [gender, setGender] = useState('Male');


	const [isPending, setIsPending] = useState(false);
	const history = useHistory();

	const [feedbackMessage, setFeedbackMessage] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		const userInfo = { name, email, password, mobileNumber, gender }
		setIsPending(true);
		setTimeout(() => {
			setIsPending(false);
			fetch('http://localhost:8080/registration', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(userInfo)
			}).then((response) => {
				response.json()
					.then((res) => {
						if (res.status === 200) {
							setFeedbackMessage(res.message);
							setName('');
							setEmail('');
							setPassword('');
							setMobileNumber('');
							setGender('Male');
							console.log('here');

							setTimeout(() => {
								history.push('/login');
							}, 300);
						}
						else {
							setFeedbackMessage(res.message);
						}
						setTimeout(() => {
							setFeedbackMessage('');
						}, 1000);
					});

			})
		}, 300);
	};

	return (
		<div className="create">
			<h2>Registration Form</h2>
			<form onSubmit={handleSubmit}>
				<label>Name</label>
				<input
					type='text'
					required
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<label>Email</label>
				<input
					type='text'
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<label>Mobile Number</label>
				<input
					type='text'
					required
					value={mobileNumber}
					onChange={(e) => setMobileNumber(e.target.value)}
				/>

				<label>Password</label>
				<input
					type='password'
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<label>Gender</label>
				<select
					value={gender}
					onChange={(e) => setGender(e.target.value)}
				>
					<option value='Male'>Male</option>
					<option value='Female'>Female</option>
				</select>


				{!isPending && <button type='submit'>Submit</button>}
				{isPending && <button type='button'>Please Wait...</button>}
			</form>



			<h3>{feedbackMessage}</h3>

		</div>
	)
}
