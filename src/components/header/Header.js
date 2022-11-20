import Searchbar from './searchbar/Searchbar';
import styles from './Header.module.css';
const Header = () => {
	return (
		<header className={`${styles.header} `}>
			<Searchbar />
		</header>
	);
};

export default Header;
