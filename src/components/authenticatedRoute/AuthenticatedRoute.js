import { useContext } from 'react';
import ReducerContext from '../../context/ReducerContext';
import { Navigate } from 'react-router-dom';
const AuthenticatedRoute = (props) => {
	const reducer = useContext(ReducerContext);
	if (!reducer.state.user) {
		return <Navigate to='/zaloguj' />;
	}
	return <>{props.element}</>;
};

export default AuthenticatedRoute;
