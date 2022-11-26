export const initialState = {
	hotels: [],
	isAuthenticated: false,
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
			return { ...state, isAuthenticated: true };
		case 'logout':
			return { ...state, isAuthenticated: false };
	}
};
