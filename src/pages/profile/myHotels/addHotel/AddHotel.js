import { useEffect, useState } from 'react';

import axios from '../../../../axios';

import { useNavigate } from 'react-router-dom';
import HotelForm from '../HotelForm';
const AddHotel = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [valid, setValid] = useState(null);

	const submit = async (e, data, isValid) => {
		e.preventDefault();
		setLoading(true);

	
		if (isValid) {
			try {
				await axios.post(`/hotels.json`, data);
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

	return (
		<div className='card mt-5 mb-5'>
			<div className='card-header'>Nowy hotel</div>
			<div className='card-body'>
				<HotelForm
					valid={valid}
					loading={loading}
					submit={submit}
					buttonText='Dodaj'
				/>
			</div>
		</div>
	);
};

export default AddHotel;
