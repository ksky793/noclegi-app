export const initialState = {
	hotels: [],
	// isAuthenticated: JSON.parse(window.localStorage.getItem('token-data'))
	// 	? true
	// 	: false,
	user: JSON.parse(window.localStorage.getItem('token-data')) || null,
	theme: 'dark',
};
export const reducer = (state, action) => {
	switch (action.type) {
		case 'change-theme':
			const theme = state.theme === 'dark' ? 'primary' : 'dark';
			return { ...state, theme };
		case 'set-hotels':
			return { ...state, hotels: action.hotels };
		case 'login':
			// return { ...state, isAuthenticated: true };
			return { ...state, user: action.user };
		case 'logout':
			return { ...state, user: null };
	}
};
