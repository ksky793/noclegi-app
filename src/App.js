import './App.css';
import Menu from './components/menu/Menu';
import Header from './components/header/Header';
import Hotels from './components/hotels/Hotels';
import { useState } from 'react';

const hotelsData = [
	{
		name: 'Pod Akcjami',
		city: 'Warszawa',
		rating: '8.5',
		description: 'abcjdskjdfka',
		image: 'img',
	},
	{
		name: 'Wolind',
		city: 'Białystok',
		rating: '8.5',
		description: 'abcjdskjdfka',
		image: 'img',
	},
];

function App() {
	const [hotels, setHotels] = useState(hotelsData);

	const handleOnSearchHotels = (term) => {
		const newHotels = [...hotelsData].filter((hotel) =>
			hotel.name.toLowerCase().includes(term.toLowerCase())
		);
		setHotels(newHotels);
	};
	return (
		<div className='App'>
			<Menu />
			<Header onSearch={(term) => handleOnSearchHotels(term)} />
			<Hotels hotels={hotels} />
		</div>
	);
}

export default App;
