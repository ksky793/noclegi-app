import './App.css';
import Menu from './components/menu/Menu';
import Header from './components/header/Header';
import Hotels from './components/hotels/Hotels';
import { useState } from 'react';

function App() {
	const [hotels, setHotels] = useState([
		{
			name: 'Pod Akcjami',
			city: 'Warszawa',
			rating: '8.5',
			description: 'abcjdskjdfka',
			image: 'img',
		},
		{
			name: 'Pod Akostem',
			city: 'Białystok',
			rating: '8.5',
			description: 'abcjdskjdfka',
			image: 'img',
		},
	]);
	return (
		<div className='App'>
			<Menu />
			<Header />
			<Hotels hotels={hotels} />
		</div>
	);
}

export default App;
