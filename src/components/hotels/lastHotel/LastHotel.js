import { useContext } from 'react';
import ThemeContext from '../../../context/ThemeContext';
const LastHotel = (props) => {
	const { theme } = useContext(ThemeContext);

	return (
		<div className='card mt-5'>
			<h5 className='card-header p-3'>
				Ostatnio oglądałeś ten nocleg. Wciąż zainteresowany?
			</h5>
			<div className='card-body'>
				<h5 className='card-title'>{props.name}</h5>
				<h6 className='mt-3 mb-3'>{props.city}</h6>
				<div>
					<button
						className={`btn btn-${theme}`}
						style={{ marginRight: '20px' }}
					>
						Tak
					</button>
					<button className={`btn btn-${theme}`} onClick={props.onRemove}>
						Nie
					</button>
				</div>
			</div>
		</div>
	);
};

export default LastHotel;
