import { useState } from 'react';
import LoadingButton from '../../components/ui/LoadingButton';
import Input from '../../components/input/Input';
import { PropaneSharp } from '@mui/icons-material';
import { validate, isFormValid } from '../../helpers/validations';
const Register = () => {
	const [loading, setLoading] = useState(false);
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

	const submit = (e) => {
		e.preventDefault();
		setLoading(true);
		const isValid = isFormValid(form);

		setTimeout(() => {
			if (isValid) {
				alert('poprawne');
				setLoading(false);
			} else {
				alert('niepoprawne');
				setLoading(false);
			}
		}, 500);
	};
	return (
		<div className='card mt-5 mb-5'>
			<div className='card-header'>Rejestracja</div>
			<div className='card-body'>
				<p>Uzupełnij dane personalne</p>
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
					{/* <Input
						label='Nazwa'
						type='text'
						name={form.name.value}
						onChange={(e) => changeHandler(e.target.value, 'name')}
						error={form.name.error}
						showError={form.name.showError}
					/>
					<Input
						label='Miejscowość'
						type='text'
						name={form.city.value}
						onChange={(e) => changeHandler(e.target.value, 'city')}
						error={form.city.error}
						showError={form.city.showError}
					/> */}
					<LoadingButton loading={loading}>Dodaj Hotel</LoadingButton>
				</form>
			</div>
		</div>
	);
};

export default Register;
