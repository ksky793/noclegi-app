import { useEffect, useState } from 'react';
import Input from '../../../components/input/Input';
import LoadingButton from '../../../components/ui/LoadingButton';
import useAuth from '../../../hooks/useAuth';
import { validate } from '../../../helpers/validations';
import { isFormValid } from '../../../helpers/validations';

const HotelForm = (props) => {
	const [auth] = useAuth();
	const [form, setForm] = useState({
		name: {
			value: '',
			error: '',
			valid: false,
			showError: false,
			rules: ['required', { rule: 'min', length: 4 }],
		},
		description: {
			value: '',
			error: '',
			valid: false,
			showError: false,
			rules: ['required'],
		},
		city: {
			value: '',
			error: '',
			valid: false,
			showError: false,
			rules: ['required', { rule: 'min', length: 2 }],
		},
		rooms: {
			value: '1',
			error: '',
			valid: true,
			showError: false,
			rules: ['required'],
		},
		features: {
			value: [],
			error: '',
			valid: true,
			showError: false,
		},
		image: {
			value: null,
			error: '',
			valid: true,
			showError: false,
		},
		status: {
			value: '',
			error: '',
			valid: false,
			showError: false,
			rules: ['required'],
		},
	});

	const submit = (e) => {
		const data = {
			name: form.name.value,
			description: form.description.value,
			city: form.city.value,
			rooms: form.rooms.value,
			features: form.features.value,
			image: form.image.value,
			status: form.status.value,
			userId: auth.localId,
		};
		const isValid = isFormValid(form);
		props.submit(e, data, isValid);
	};
	const changeFeatureHandler = (e) => {
		const value = e.target.value;
		const isChecked = e.target.checked;

		if (isChecked) {
			const newFeatures = [...form.features.value, value];
			// setForm({ ...form, features: newFeatures });
			changeHandler(newFeatures, 'features');
		} else {
			const newFeatures = form.features.value.filter((x) => x !== value);
			// setForm({ ...form, features: newFeatures });
			changeHandler(newFeatures, 'features');
		}
	};

	const changeHandler = (value, fieldName) => {
		const error = validate(form[fieldName].rules, value);

		setForm({
			...form,
			[fieldName]: {
				...form[fieldName],
				value: value,
				valid: error ? false : true,
				showError: error ? true : false,
				error: error,
			},
		});
	};

	useEffect(() => {
		if (props.hotel !== null) {
			const newForm = { ...form };

			for (const key in props.hotel) {
				if (key !== 'userId') {
					newForm[key].value = props.hotel[key];
					newForm[key].valid = true;
				}
			}
			setForm({ ...newForm });
		}
	}, [props.hotel]);

	return (
		<>
			{props.valid === false && (
				<div className='alert alert-danger'>Coś poszło nie tak.</div>
			)}
			<form onSubmit={submit}>
				<Input
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
				/>
				<Input
					label='Opis'
					type='textarea'
					name={form.description.value}
					onChange={(e) => changeHandler(e.target.value, 'description')}
					error={form.description.error}
					showError={form.description.showError}
				/>
				<Input
					label='Ilość pokoi'
					type='select'
					name={form.rooms.value}
					options={[
						{ value: 1, label: 1 },
						{ value: 2, label: 2 },
						{ value: 3, label: 3 },
					]}
					onChange={(e) => changeHandler(e.target.value, 'rooms')}
					error={form.rooms.error}
					showError={form.rooms.showError}
				/>

				<div className='form-group'>
					<h4>Udogodnienia</h4>
					<Input
						type='checkbox'
						features={form.features.value}
						onChange={changeFeatureHandler}
						error={form.features.error}
						showError={form.features.showError}
						options={[
							{ name: 'tv', label: 'TV' },
							{ name: 'parking', label: 'Parking' },
							{ name: 'balcon', label: 'Balkon' },
						]}
					/>
				</div>
				<Input
					label='Zdjęcie'
					type='file'
					name='formFile'
					onChange={(e) => changeHandler(e.target.files, 'image')}
					error={form.image.error}
					showError={form.image.showError}
				/>

				<div className='form-group'>
					<h4>Status</h4>
					<Input
						type='radio'
						name='status'
						status={form.status.value}
						onChange={(e) => changeHandler(e.target.value, 'status')}
						error={form.status.error}
						showError={form.status.showError}
						options={[
							{ value: '1', label: 'Widoczny' },
							{ value: '0', label: 'Ukryty' },
						]}
					/>
				</div>
				<LoadingButton loading={props.loading}>
					{props.buttonText}
				</LoadingButton>
			</form>
		</>
	);
};

export default HotelForm;
