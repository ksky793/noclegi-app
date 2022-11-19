import './App.css';
import Menu from './components/menu/Menu';
import Header from './components/header/Header';
import Hotels from './components/hotels/Hotels';

function App() {
	return (
		<div className='App'>
			<Menu />
			<Header />
			<Hotels />
		</div>
	);
}

export default App;
