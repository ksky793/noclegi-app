import Hotel from '../hotels/hotel/Hotel';
import styles from './Hotels.module.css';
const Hotels = (props) => {
	return (
		<div className={`${styles.container}`}>
			<h2 className={`${styles.title}`}>Oferty:</h2>
			{props.hotels.map((hotel) => (
				<Hotel {...hotel} key={hotel.id} onOpen={props.onOpen} />
			))}
		</div>
	);
};

export default Hotels;
