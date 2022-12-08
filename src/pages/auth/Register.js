import { useState } from 'react';
import LoadingButton from '../../components/ui/LoadingButton';
import Input from '../../components/input/Input';
import { PropaneSharp } from '@mui/icons-material';
import { validate, isFormValid } from '../../helpers/validations';
import axios from 'axios';
import axiosBase from '../../axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
const Register = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const [error, setError] = useState({
		valid: null,
		message: '',
	});

	const [auth, setAuth] = useAuth();

	const [form, setForm] = useState({
		email: {
			value: '',
			error: '',
			showError: false,
			valid: false,
			rules: ['required', 'email'],
		},
		password: {
			value: '',
			error: '',
			showError: false,
			valid: false,
			rules: ['required', { rule: 'min', length: 6 }],
		},
	});

	const changeHandler = (value, fieldName) => {
		const error = validate(form[fieldName].rules, value);

		setForm({
			...form,
			[fieldName]: {
				...form[fieldName],
				value: value,
				error: error,
				valid: error ? false : true,
				showError: error ? true : false,
			},
		});
	};

	const submit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const isValid = isFormValid(form);

		if (isValid) {
			try {
				await axios.post(
					'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAJ5Eo5P6ilmu2S6KpAG8MTnSQUczMdrF4',
					{
						email: form.email.value,
						password: form.password.value,
						returnSecureToken: true,
					}
				);
				setError({ ...error, valid: true });
				navigate('/zaloguj');
			} catch (e) {
				setError({ valid: false, message: e.response.data.error.message });
				setLoading(false);
			}
		} else {
			setError({ message: 'Coś poszło nie tak', valid: false });
			setLoading(false);
		}
	};

	if (auth) navigate('/');
	return (
		<div className='card mt-5 mb-5'>
			<div className='card-header'>Rejestracja</div>
			<div className='card-body'>
				{error.valid === false && (
					<div className='alert alert-danger'>{error.message}</div>
				)}
				<form onSubmit={submit}>
					<Input
						label='Email'
						showError={form.email.showError}
						name={form.email.value}
						onChange={(e) => changeHandler(e.target.value, 'email')}
						error={form.email.error}
					/>
					<Input
						label='Hasło'
						showError={form.password.showError}
						name={form.password.value}
						onChange={(e) => changeHandler(e.target.value, 'password')}
						error={form.password.error}
					/>
					<LoadingButton loading={loading}>Zarejestruj się</LoadingButton>
				</form>
			</div>
		</div>
	);
};

export default Register;
