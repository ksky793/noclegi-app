import { useContext, useState } from 'react';
import Hotels from '../components/hotels/Hotels';
import LastHotel from '../components/hotels/lastHotel/LastHotel';
import ReducerContext from '../context/ReducerContext';
import useLocalStorage from '../hooks/useLocalStorage';
import { useEffect } from 'react';
import LoadingIcon from '../components/ui/LoadingIcon';
import axios from '../axios';
import { getArrayFromObject } from '../helpers/objects';
const hotelsData = [
	{
		id: 1,
		name: 'Pod Akcjami',
		city: 'Warszawa',
		rating: '8.5',
		description: 'abcjdskjdfka',
		image: 'img',
	},
	{
		id: 2,
		name: 'Wolind',
		city: 'Białystok',
		rating: '8.5',
		description: 'abcjdskjdfka',
		image: 'img',
	},
];

const Home = () => {
	const reducer = useContext(ReducerContext);
	// własny hook zapisujący stan do local storage
	const [lastHotel, setLastHotel] = useLocalStorage('last-hotel', null);
	const [loading, setLoading] = useState(true);
	const [hotels, setHotels] = useState([]);

	const openHotel = (hotel) => {
		setLastHotel(hotel);
	};
	const removeLastHotel = () => {
		setLastHotel(null);
	};

	const fetchHotels = async () => {
		try {
			const res = await axios.get('/hotels.json');
			// chcemy wyświetlić hotele, które mają status widoczne = 1
			const newHotels = getArrayFromObject(res).filter(
				(hotel) => hotel.status === '1'
			);
			setLoading(false);
			setHotels(newHotels);
		} catch (e) {
			console.log(e.response);
			setLoading(false);
		}
	};
	
	useEffect(() => {
		fetchHotels();
	}, []);

	return (
		<>
			{loading ? (
				<LoadingIcon />
			) : (
				<>
					{lastHotel && <LastHotel {...lastHotel} onRemove={removeLastHotel} />}
					<Hotels onOpen={openHotel} hotels={hotels} />
				</>
			)}
		</>
	);
};

export default Home;
