import { Link } from 'react-router-dom';

const MyHotels = () => {
	return (
		<div>
			<p>Nie masz jeszcze dodanych żadnych hoteli</p>
			<Link to='/profil/hotele/dodaj'>
				<button className='btn btn-dark'>Dodaj Hotel</button>
			</Link>
		</div>
	);
};

export default MyHotels;
