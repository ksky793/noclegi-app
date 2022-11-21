import Searchbar from './searchbar/Searchbar';
import styles from './Header.module.css';
const Header = (props) => {
	return (
		<header className={`${styles.header} `}>
			<Searchbar onSearch={props.onSearch} />
		</header>
	);
};

export default Header;
