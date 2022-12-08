import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '../../components/ui/LoadingButton';
import useAuth from '../../hooks/useAuth';

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [auth, setAuth] = useAuth();

	const submit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await axios.post(
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAJ5Eo5P6ilmu2S6KpAG8MTnSQUczMdrF4',
				{
					email: email,
					password: password,
					returnSecureToken: true,
				}
			);
			setAuth(true, {
				idToken: res.data.idToken,
				email: res.data.email,
				localId: res.data.localId,
			});
			navigate('/');
		} catch (e) {
			setError(e.response.data.error.message);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (auth) {
			navigate('/');
		}
	}, []);

	return (
		<div className='mt-5 mb-5'>
			<h2>Logowanie</h2>
			<form onSubmit={submit}>
				{error && <div className='alert alert-danger'>{error}</div>}
				<div className='form-group mb-3'>
					<label>Email</label>
					<input
						type='email'
						className='form-control'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Email'
					/>
				</div>
				<div className='form-group'>
					<label>Hasło</label>
					<input
						type='password'
						className='form-control'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder='*****'
					/>
				</div>
				<LoadingButton loading={loading}>Zaloguj</LoadingButton>
			</form>
		</div>
	);
};

export default Login;
