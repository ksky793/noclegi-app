import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '../../components/ui/LoadingButton';
import useAuth from '../../hooks/useAuth';

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [valid, setValid] = useState(null);
	const [auth, setAuth] = useAuth();

	const submit = (e) => {
		e.preventDefault();
		setLoading(true);

		setTimeout(() => {
			// Logowanie
			if (true) {
				setAuth(true);
				navigate('/');
			} else {
				setAuth(false);
				setValid(false);
				setPassword('');
			}
			setLoading(false);
		}, 1000);
	};
	return (
		<div className='mt-5 mb-5'>
			<h2>Logowanie</h2>
			<form onSubmit={submit}>
				{valid === false && (
					<div className='alert alert-danger'>Niepoprawne dane logowania</div>
				)}
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
