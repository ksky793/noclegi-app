import { useEffect, useState } from 'react';
import axios from '../../../../axios';
import { useNavigate } from 'react-router-dom';
import HotelForm from '../HotelForm';
import { useParams } from 'react-router-dom';
const EditHotel = () => {
	const navigate = useNavigate();
	const { hotelId } = useParams();
	const [loading, setLoading] = useState(false);
	const [valid, setValid] = useState(null);
	const [hotel, setHotel] = useState(null);

	const submit = async (e, data, isValid) => {
		e.preventDefault();
		setLoading(true);

		if (isValid) {
			try {
				await axios.put(`/hotels/${hotelId}.json`, data);
				setLoading(false);
				navigate('/profil/hotele');
			} catch (e) {
				setLoading(false);
				setValid(false);
			}
		} else {
			setLoading(false);
			setValid(false);
		}
	};

	const fetchHotels = async () => {
		try {
			const res = await axios.get(`/hotels/${hotelId}.json`);
			setHotel(res.data);
		} catch (e) {}
	};
	useEffect(() => {
		fetchHotels();
	}, []);
	return (
		<div className='card mt-5 mb-5'>
			<div className='card-header'>Edytuj hotel</div>
			<div className='card-body'>
				<HotelForm
					hotel={hotel}
					valid={valid}
					loading={loading}
					submit={submit}
					buttonText='Edytuj'
				/>
			</div>
		</div>
	);
};

export default EditHotel;
