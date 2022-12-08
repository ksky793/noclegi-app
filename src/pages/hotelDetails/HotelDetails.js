import axios from '../../axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingIcon from '../../components/ui/LoadingIcon';
import './HotelDetails.css';
import ThemeContext from '../../context/ThemeContext';
import useAuth from '../../hooks/useAuth';
import { getArrayFromObject } from '../../helpers/objects';

const HotelDetails = () => {
	const { theme } = useContext(ThemeContext);
	const [loading, setLoading] = useState(true);
	const [auth] = useAuth();

	const { hotelId } = useParams();
	const [hotel, setHotel] = useState({});
	const [comment, setComment] = useState('');
	const [hotelComments, setHotelComments] = useState([]);
	const fetchHotel = async () => {
		const res = await axios.get(
			`/hotels.json?orderBy="$key"&equalTo="${hotelId}"`
		);

		setHotel(res.data[hotelId]);
		setLoading(false);
	};
	const fetchReviews = async () => {
		const comments = await axios.get(
			`/reviews.json?orderBy="hotel_id"&equalTo="${hotelId}"`
		);
		const newComments = getArrayFromObject(comments);
		setHotelComments(newComments);
		console.log(newComments);
	};

	useEffect(() => {
		fetchHotel();
		fetchReviews();
	}, []);

	const addReview = async (e) => {
		e.preventDefault();

		const data = {
			email: auth.email,
			hotel_id: hotelId,
			comment: comment,
		};
		try {
			await axios.post('/reviews.json', data);
			setHotelComments([...hotelComments, data]);
			setComment('');
		} catch (err) {
			console.log(err.response);
		}
	};
	return (
		<>
			{loading ? (
				<LoadingIcon />
			) : (
				<div className='card mt-5 mb-5'>
					<h5 className='card-header p-3'>{hotel.name}</h5>
					<div className='card-body'>
						<div className='p-4'>
							<h3>Miasto</h3>
							<p>{hotel.city}</p>
							<h3>Opis</h3>
							<p>{hotel.description}</p>
							<h3>Udogodnienia</h3>
							<ul>
								{hotel.features.map((el, index) => (
									<li key={index}>{el}</li>
								))}
							</ul>
							<h3 className='mb-3'>Opinie</h3>
							<div className='hotel-reviews'>
								{hotelComments.map((comment, index) => (
									<div className='hotel-review' key={index}>
										<h5>{comment.email}</h5>
										<p>{comment.comment}</p>
									</div>
								))}
							</div>
							{auth && (
								<div className='add-review-container mt-5'>
									<h4>Dodaj Komentarz</h4>
									<textarea
										className='w-100 mt-3 mb-3'
										value={comment}
										onChange={(e) => setComment(e.target.value)}
									/>
									<button className={`btn btn-${theme}`} onClick={addReview}>
										Dodaj
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default HotelDetails;
