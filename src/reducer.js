export const initialState = {
	hotels: [],
	theme: 'dark',
};
export const reducer = (state, action) => {
	switch (action.type) {
		case 'change-theme':
			const theme = state.theme === 'dark' ? 'primary' : 'dark';
			return { ...state, theme };
		case 'set-hotels':
			return { ...state, hotels: action.hotels };
	}
};
