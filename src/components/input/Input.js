const InputTextArea = (props) => {
	return (
		<div className='form-group'>
			<label>{props.label}</label>
			<textarea
				type='text'
				className={`form-control ${props.showError && 'is-invalid'}`}
				value={props.name}
				onChange={props.onChange}
			/>
			<div className='invalid-feedback'>{props.error}</div>
		</div>
	);
};

const InputCheck = (props) => {
	return (
		<>
			{props.options.map((option, index) => (
				<div className='form-check' key={index}>
					<input
						className='form-check-input'
						type={props.type}
						value={option.name}
						id={option.name}
						checked={
							props.features.find((x) => x === `${option.name}`) || false
						}
						onChange={props.onChange}
					/>
					<label className='form-check-label' htmlFor={props.name}>
						{option.label}
					</label>
				</div>
			))}
		</>
	);
};

const InputText = (props) => {
	return (
		<div className='form-group'>
			<label>{props.label}</label>
			<input
				type='text'
				className={`form-control ${props.showError && 'is-invalid'}`}
				value={props.name}
				onChange={props.onChange}
			/>
			<div className='invalid-feedback'>{props.error}</div>
		</div>
	);
};

const InputFile = (props) => {
	return (
		<div className='form-group mb-3'>
			<h4>{props.label}</h4>
			<input
				className={`form-control ${props.showError && 'is-invalid'}`}
				type={props.type}
				id={props.name}
				ref={props.reference}
				onChange={props.onChange}
			/>
			<div className='invalid-feedback'>{props.error}</div>
		</div>
	);
};

const InputRadio = (props) => {
	return (
		<>
			{props.options.map((option) => (
				<div className='form-check' key={option.value}>
					<input
						className={`form-check-input ${props.showError && 'is-invalid'}`}
						type='radio'
						name={props.name}
						id={option.value}
						value={option.value}
						checked={props.status == option.value}
						onChange={props.onChange}
					/>
					<label className='form-check-label' htmlFor={option.value}>
						{option.label}
					</label>
					<div className='invalid-feedback'>{props.error}</div>
				</div>
			))}
		</>
	);
};

const InputSelect = (props) => {
	return (
		<div className='form-group'>
			<label>{props.label}</label>
			<select
				className={`form-select ${props.showError && 'is-invalid'}`}
				value={props.name}
				onChange={props.onChange}
			>
				{props.options.map((option) => (
					<option value={option.value} key={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<div className='invalid-feedback'>{props.error}</div>
		</div>
	);
};

const Input = (props) => {
	switch (props.type) {
		case 'textarea':
			return <InputTextArea {...props} />;
		case 'select':
			return <InputSelect {...props} />;
		case 'checkbox':
			return <InputCheck {...props} />;
		case 'file':
			return <InputFile {...props} />;
		case 'radio':
			return <InputRadio {...props} />;
		default:
			return <InputText {...props} />;
	}
};

export default Input;
