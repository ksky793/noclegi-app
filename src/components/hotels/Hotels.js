import Hotel from '../hotels/hotel/Hotel';
import styles from './Hotels.module.css';
const Hotels = (props) => {
	return (
		<div className={`${styles.container} container`}>
			<h2 className={`${styles.title}`}>Oferty:</h2>
			{/* <Hotel />
			<Hotel /> */}
			{props.hotels.map((hotel, index) => (
				<Hotel {...hotel} key={index} />
			))}
		</div>
	);
};

export default Hotels;
