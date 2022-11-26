import styles from './Hotel.module.css';
import imgHotel from '../../assets/images/hotel1.jpg';
import ThemeContext from '../../../context/ThemeContext';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
const Hotel = (props) => {
	const { theme } = useContext(ThemeContext);
	const handleClick = () => {
		props.onOpen(props);
	};

	return (
		<div className={`${styles.hotel}`}>
			<div className={`${styles.top}`}>
				<img src={imgHotel} alt='hotel1' className='img-fluid'></img>
			</div>
			<div className={`${styles.bottom}`}>
				<h5 className={`${styles.title}`}>{props.name}</h5>
				<h5 className={`${styles.title}`}>{`Ocena: ${props.rating}`}</h5>
				<p className={`${styles.description}`}>{props.description}</p>
				<Link to={`/hotel/${props.id}`}>
					<button className={`btn btn-${theme}`} onClick={handleClick}>
						Pokaż
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Hotel;
