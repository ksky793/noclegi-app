import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Hotels from '../components/hotels/Hotels';
import LoadingButton from '../components/ui/LoadingIcon';
import axios from '../axios';
import { getArrayFromObject } from '../helpers/objects';

const Search = () => {
	const { term } = useParams();
	const [hotels, setHotels] = useState([]);
	const [loading, setLoading] = useState(true);

	const search = async () => {
		try {
			const res = await axios.get('/hotels.json');
			// chcemy wyświetlić hotele, które mają status widoczne = 1
			const newHotels = getArrayFromObject(res).filter((hotel) =>
				hotel.name.toLowerCase().includes(term.toLowerCase())
			);
			setLoading(false);
			setHotels(newHotels);
		} catch (e) {
			console.log(e.response);
			setLoading(false);
		}
	};

	useEffect(() => {
		search();
	}, [term]);
	return (
		<section id='search-results' className='mt-5 mb-5'>
			<h5>Wyniki wyszukiwania: {term}</h5>
			{loading ? <LoadingButton /> : <Hotels hotels={hotels} />}
		</section>
	);
};

export default Search;
