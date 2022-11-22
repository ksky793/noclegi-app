import { useContext, useState } from 'react';
import ThemeContext from '../../../context/ThemeContext';

const Searchbar = (props) => {
	const color = useContext(ThemeContext);
	const [term, setTerm] = useState('');

	const search = () => {
		props.onSearch(term);
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
				<button className={`btn btn-${color.theme}`} onClick={search}>
					Szukaj
				</button>
			</div>
		</div>
	);
};

export default Searchbar;
