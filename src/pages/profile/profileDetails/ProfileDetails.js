import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import LoadingButton from '../../../components/ui/LoadingButton';
import { AuthContext } from '../../../context/AuthContext';
import { validateEmail } from '../../../helpers/validations';
import useAuth from '../../../hooks/useAuth';
const ProfileDetails = () => {
	const [auth] = useAuth();

	const [email, setEmail] = useState(auth.email);
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({
		email: '',
		password: '',
		submit: '',
	});

	const buttonDisabled = Object.values(errors).filter(
		(error) => error !== ''
	).length;
	const submit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const data = {
			idToken: auth.idToken,
			email: email,
			returnSecureToken: true,
		};
		if (password) {
			data.password = password;
		}
		try {
			const res = await axios.post(
				'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAJ5Eo5P6ilmu2S6KpAG8MTnSQUczMdrF4',
				data
			);
			console.log(res);
			setErrors({ ...errors, submit: 'Pomyślnie zaktualizowano dane' });
			setLoading(false);
		} catch (e) {
			console.log(e.response);
			setErrors({ ...errors, submit: e.response.data.error.message });
			setLoading(false);
		}
	};

	useEffect(() => {
		if (validateEmail(email)) {
			setErrors({ ...errors, email: '' });
		} else {
			setErrors({ ...errors, email: 'Niepoprawny email' });
		}
	}, [email]);

	useEffect(() => {
		if (password.length >= 4 || password.length === 0) {
			setErrors({ ...errors, password: '' });
		} else {
			setErrors({
				...errors,
				password: 'Hasło powinno zawierać conajmniej 4 znaki',
			});
		}
	}, [password]);
	return (
		<form onSubmit={submit}>
			<div className='form-group mb-3'>
				{errors.submit && (
					<div className='alert alert-primary'>{errors.submit}</div>
				)}
				<label>Email</label>
				<input
					type='email'
					className={`form-control ${errors.email ? 'is-invalid' : 'is-valid'}`}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder='Email'
				/>
				<div className='invalid-feedback'>{errors.email}</div>
				<div className='valid-feedback'>Wszystko się zgadza!</div>
			</div>
			<div className='form-group'>
				<label>Hasło</label>
				<input
					type='password'
					className={`form-control ${errors.password ? 'is-invalid' : ''}`}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<div className='invalid-feedback'>{errors.password}</div>
			</div>
			<LoadingButton loading={loading} disabled={buttonDisabled}>
				Zapisz
			</LoadingButton>
		</form>
	);
};

export default ProfileDetails;
