import './App.css';
import Menu from './components/menu/Menu';
import Header from './components/header/Header';
import Searchbar from './components/header/searchbar/Searchbar';
import Footer from './components/footer/Footer';
import Layout from './components/layout/Layout';
import { useReducer } from 'react';
import ThemeButton from './components/ui/themeButton/ThemeButton';
import ThemeContext from './context/ThemeContext';
import ReducerContext from './context/ReducerContext';
import { Routes, Route } from 'react-router-dom';
import { initialState, reducer } from './reducer';
import Home from './pages/Home';
import Search from './pages/Search';
import { AuthContext } from './context/AuthContext';
import Profile from './pages/profile/Profile';
import MyHotels from './pages/profile/myHotels/MyHotels';
import ProfileDetails from './pages/profile/profileDetails/ProfileDetails';
import NotFound from './pages/404/404';
import Login from './pages/auth/Login';
import AuthenticatedRoute from './components/authenticatedRoute/AuthenticatedRoute';
import AddHotel from './pages/profile/myHotels/addHotel/AddHotel';
import Register from './pages/auth/Register';

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
					element={<AuthenticatedRoute element={<Profile />} />}
				>
					<Route path='/profil' element={<ProfileDetails />} />
					<Route path='/profil/hotele' element={<MyHotels />} />
				</Route>
				<Route
					path='/profil/hotele/dodaj'
					element={<AuthenticatedRoute element={<AddHotel />} />}
				/>

				<Route path='/zaloguj' element={<Login />} />
				<Route path='/rejestracja' element={<Register />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	);

	const footer = <Footer />;

	const menu = <Menu />;
	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: state.isAuthenticated,
				login: () => dispatch({ type: 'login' }),
				logout: () => dispatch({ type: 'logout' }),
			}}
		>
			<ThemeContext.Provider
				value={{
					theme: state.theme,
					changeTheme: () => {
						dispatch({ type: 'change-theme' });
					},
				}}
			>
				<ReducerContext.Provider value={{ state: state, dispatch: dispatch }}>
					<Layout
						header={header}
						menu={menu}
						content={content}
						footer={footer}
					/>
				</ReducerContext.Provider>
			</ThemeContext.Provider>
		</AuthContext.Provider>
	);
}

export default App;
