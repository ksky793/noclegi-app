import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ThemeContext from '../../context/ThemeContext';
const Menu = () => {
	const { theme } = useContext(ThemeContext);
	return (
		<Navbar collapseOnSelect expand='lg' bg={`${theme}`} variant='dark'>
			<Container>
				<Navbar.Brand href='#home'>Noclegi.com</Navbar.Brand>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav className='me-auto'>
						<Nav.Link href='#home'>Strona Główna</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Menu;
