import './App.css';
import Menu from './components/menu/Menu';
import Header from './components/header/Header';
import Hotels from './components/hotels/Hotels';
import Searchbar from './components/header/searchbar/Searchbar';
import Footer from './components/footer/Footer';
import Layout from './components/layout/Layout';
import { useEffect, useReducer, useState } from 'react';
import ThemeButton from './components/ui/themeButton/ThemeButton';
import ThemeContext from './context/ThemeContext';
import BestHotel from './components/hotels/bestHotel/BestHotel';
import useLocalStorage from './hooks/useLocalStorage';
import LastHotel from './components/hotels/lastHotel/LastHotel';
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

const initialState = {
	hotels: [],
	theme: 'dark',
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'change-theme':
			const theme = state.theme === 'dark' ? 'primary' : 'dark';
			return { ...state, theme };
		case 'set-hotels':
			return { ...state, hotels: action.hotels };
	}
};

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	// własny hook zapisujący stan do local storage
	const [lastHotel, setLastHotel] = useLocalStorage('last-hotel', null);

	const handleOnSearchHotels = (term) => {
		const newHotels = [...hotelsData].filter((hotel) =>
			hotel.name.toLowerCase().includes(term.toLowerCase())
		);
		dispatch({ type: 'set-hotels', hotels: newHotels });
	};

	const openHotel = (hotel) => {
		setLastHotel(hotel);
	};
	const removeLastHotel = () => {
		setLastHotel(null);
	};
	useEffect(() => {
		dispatch({ type: 'set-hotels', hotels: hotelsData });
	}, []);

	return (
		<ThemeContext.Provider
			value={{
				theme: state.theme,
				changeTheme: () => {
					dispatch({ type: 'change-theme' });
				},
			}}
		>
			<Layout
				header={
					<Header>
						<Searchbar onSearch={(term) => handleOnSearchHotels(term)} />
						<ThemeButton />
					</Header>
				}
				menu={<Menu />}
				content={
					<>
						{lastHotel && (
							<LastHotel {...lastHotel} onRemove={removeLastHotel} />
						)}
						<Hotels onOpen={openHotel} hotels={state.hotels} />
					</>
				}
				footer={<Footer />}
			/>
		</ThemeContext.Provider>
	);
}

export default App;
