import { useEffect, useState } from 'react';
import LoadingButton from '../../../components/ui/LoadingButton';
import { validateEmail } from '../../../helpers/validations';
const ProfileDetails = () => {
	const [email, setEmail] = useState('kamil@gmail.com');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({
		email: '',
		password: '',
	});

	const buttonDisabled = Object.values(errors).filter(
		(error) => error !== ''
	).length;
	const submit = (e) => {
		e.preventDefault();
		setLoading(true);

		setTimeout(() => {
			console.log(buttonDisabled);
			setLoading(false);
		}, 1000);
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
			<LoadingButton loading={loading} disabled={buttonDisabled}>Zapisz</LoadingButton>
		</form>
	);
};

export default ProfileDetails;
