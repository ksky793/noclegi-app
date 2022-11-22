import { createContext } from 'react';

const ThemeContext = createContext({
	theme: 'primary',
	changeTheme: () => {}
});

export default ThemeContext;
