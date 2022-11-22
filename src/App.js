import './App.css';
import Menu from './components/menu/Menu';
import Header from './components/header/Header';
import Hotels from './components/hotels/Hotels';
import Searchbar from './components/header/searchbar/Searchbar';
import Footer from './components/footer/Footer';
import Layout from './components/layout/Layout';
import { useState } from 'react';
import ThemeButton from './components/ui/themeButton/ThemeButton';
import ThemeContext from './context/ThemeContext';
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
	const [theme, setTheme] = useState('dark');

	const handleOnSearchHotels = (term) => {
		const newHotels = [...hotelsData].filter((hotel) =>
			hotel.name.toLowerCase().includes(term.toLowerCase())
		);
		setHotels(newHotels);
	};

	const changeTheme = () => {
		const newTheme = theme === 'primary' ? 'dark' : 'primary';
		setTheme(newTheme);
	};
	return (
		<ThemeContext.Provider
			value={{
				theme: theme,
				changeTheme: changeTheme,
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
				hotels={<Hotels hotels={hotels} />}
				footer={<Footer />}
			/>
		</ThemeContext.Provider>
	);
}

export default App;
