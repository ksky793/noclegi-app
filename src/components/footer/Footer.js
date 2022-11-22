import { useContext } from 'react';
import ThemeContext from '../../context/ThemeContext';
const Footer = () => {
	const { theme } = useContext(ThemeContext);
	return (
		<footer id='sticky-footer' className={`py-4 bg-${theme} text-white`}>
			<div className='container text-center'>
				<p>Noclegi 2022</p>
			</div>
		</footer>
	);
};

export default Footer;
