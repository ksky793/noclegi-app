import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Hotels from '../components/hotels/Hotels';
import LoadingButton from '../components/ui/themeButton/LoadingButton';

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
const Search = () => {
	const { term } = useParams();
	const [hotels, setHotels] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			const newHotels = [...hotelsData].filter((hotel) =>
				hotel.name.toLowerCase().includes(term.toLowerCase())
			);
			if (loading) {
				setHotels(newHotels);
				setLoading(false);
			}

			console.log(newHotels);
		}, 1000);
	}, []);
	return (
		<section id='search-results' className='mt-5 mb-5'>
			<h5>Wyniki wyszukiwania: {term}</h5>
			{loading ? <LoadingButton /> : <Hotels hotels={hotels} />}
		</section>
	);
};

export default Search;
