import { useState } from 'react';

const Searchbar = () => {
	const [term, setTerm] = useState('');

	const search = () => {
		console.log(term);
	};

	return (
		<div className='container input'>
			<div className='d-flex'>
				<input
					className='form-control'
					onKeyDown={(e) => e.key === 'Enter' && search()}
					onChange={(e) => setTerm(e.target.value)}
					placeholder='Szukaj...'
					style={{ height: '50px' }}
				></input>
				<button className='btn btn-dark' onClick={search}>
					Szukaj
				</button>
			</div>
		</div>
	);
};

export default Searchbar;
