import { useContext } from 'react';
import ThemeContext from '../../../context/ThemeContext';
const LoadingButton = () => {
	const { theme } = useContext(ThemeContext);
	const styles = {};
	return (
		<div className='text-center mt-5 mb-5'>
			<div className={`spinner-border text-${theme}`} role='status'>
				{/* <span class='sr-only'>Loading...</span> */}
			</div>
		</div>
	);
};

export default LoadingButton;
