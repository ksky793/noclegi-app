import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../axios';
import { getArrayFromObject } from '../../../helpers/objects';
import useAuth from '../../../hooks/useAuth';

const MyHotels = () => {
	const [auth] = useAuth();
	const [hotels, setHotels] = useState([]);

	const handleDelete = async (id) => {
		await axios.delete(`/hotels/${id}.json`);
		const newHotels = hotels.filter((hotel) => hotel.id !== id);
		setHotels(newHotels);
	};

	const fetchHotels = async () => {
		try {
			const res = await axios.get('/hotels.json');
			const newHotels = getArrayFromObject(res).filter(
				(hotel) => hotel.userId === auth.localId
			);
			setHotels(newHotels);
		} catch (e) {
			console.log(e.response);
		}
	};

	useEffect(() => {
		fetchHotels();
	}, []);
	return (
		<div>
			{hotels.length ? (
				<table className='table'>
					<thead>
						<tr>
							<th>Hotele</th>
							<th>Status</th>
							<th>Opcje</th>
						</tr>
					</thead>
					<tbody>
						{hotels.map((hotel) => (
							<tr key={hotel.id}>
								<td>{hotel.name}</td>
								<td>{hotel.status == 1 ? 'Widoczny' : 'Ukryty'}</td>
								<td>
									<Link
										to={`/profil/hotele/edytuj/${hotel.id}`}
										className='btn btn-warning me-3'
									>
										Edytuj
									</Link>
									<button
										className='btn btn-danger '
										onClick={() => handleDelete(hotel.id)}
									>
										Usuń
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<>
					<p>Nie masz jeszcze dodanych żadnych hoteli</p>
				</>
			)}
			<Link to='/profil/hotele/dodaj'>
				<button className='btn btn-dark'>Dodaj Hotel</button>
			</Link>
		</div>
	);
};

export default MyHotels;
