import ThemeContext from '../../context/ThemeContext';
import { useContext } from 'react';
const LoadingButton = (props) => {
	const { theme } = useContext(ThemeContext);
	return (
		<>
			{props.loading ? (
				<button className={`btn btn-${theme} mt-3`} type='button' disabled>
					<span
						className='spinner-border spinner-border-sm'
						role='status'
						aria-hidden='true'
					></span>
				</button>
			) : (
				<button className={`btn btn-${theme} mt-3`} disabled={props.disabled}>
					{props.children}
				</button>
			)}
		</>
	);
};

export default LoadingButton;
