import { useContext, useState } from 'react';
import Hotels from '../components/hotels/Hotels';
import LastHotel from '../components/hotels/lastHotel/LastHotel';
import ReducerContext from '../context/ReducerContext';
import useLocalStorage from '../hooks/useLocalStorage';
import { useEffect } from 'react';
import LoadingIcon from '../components/ui/LoadingIcon';
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

	const openHotel = (hotel) => {
		setLastHotel(hotel);
	};
	const removeLastHotel = () => {
		setLastHotel(null);
	};

	useEffect(() => {
		setTimeout(() => {
			if (loading) {
				reducer.dispatch({ type: 'set-hotels', hotels: hotelsData });
				setLoading(false);
			}
		}, 1000);
	}, []);

	return (
		<>
			{loading ? (
				<LoadingIcon />
			) : (
				<>
					{lastHotel && <LastHotel {...lastHotel} onRemove={removeLastHotel} />}
					<Hotels onOpen={openHotel} hotels={reducer.state.hotels} />
				</>
			)}
		</>
	);
};

export default Home;