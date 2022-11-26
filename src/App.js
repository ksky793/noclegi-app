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
import ReducerContext from './context/ReducerContext';
import BestHotel from './components/hotels/bestHotel/BestHotel';
import useLocalStorage from './hooks/useLocalStorage';
import LastHotel from './components/hotels/lastHotel/LastHotel';
import { Routes, Route } from 'react-router-dom';
import { initialState, reducer } from './reducer';
import Home from './pages/Home';
import Search from './pages/Search';

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

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const header = (
		<Header>
			<Searchbar />
			<ThemeButton />
		</Header>
	);

	const content = (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/szukaj/:term' element={<Search />} />
				<Route
					path='/profil'
					element={
						<>PRofil</>
					}
				/>
			</Routes>
		</>
	);

	const footer = <Footer />;

	const menu = <Menu />;
	return (
		<ThemeContext.Provider
			value={{
				theme: state.theme,
				changeTheme: () => {
					dispatch({ type: 'change-theme' });
				},
			}}
		>
			<ReducerContext.Provider value={{ state: state, dispatch: dispatch }}>
				<Layout header={header} menu={menu} content={content} footer={footer} />
			</ReducerContext.Provider>
		</ThemeContext.Provider>
	);
}

export default App;
