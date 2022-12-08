import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
	const authContext = useContext(AuthContext);
	const auth = authContext.user;

	const setAuth = (value, user) => {
		if (value) {
			if (user)
				window.localStorage.setItem('token-data', JSON.stringify(user));

			authContext.login(user);
		} else {
			window.localStorage.removeItem('token-data');
			authContext.logout();
		}
	};
	return [auth, setAuth];
};
export default useAuth;
