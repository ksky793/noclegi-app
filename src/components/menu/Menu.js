import { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ThemeContext from '../../context/ThemeContext';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
const Menu = () => {
	const { theme } = useContext(ThemeContext);
	const [auth, setAuth] = useAuth();

	const login = () => {
		setAuth(true);
	};
	const logout = () => {
		setAuth(false);
	};
	return (
		<Navbar collapseOnSelect expand='lg' bg={`${theme}`} variant='dark'>
			<Container>
				<Navbar.Brand as={Link} to='/'>
					Noclegi.com
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav className='me-auto' defaultActiveKey='/'>
						<Nav.Link as={Link} to='/'>
							Strona Główna
						</Nav.Link>
						{auth ? (
							<>
								<Nav.Link as={Link} to='/profil'>
									Profil
								</Nav.Link>
								<Nav.Link onClick={logout}>Wyloguj</Nav.Link>
							</>
						) : (
							<>
								<Nav.Link onClick={login}>Zaloguj</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Menu;
