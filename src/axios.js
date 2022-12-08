import axios from 'axios';

const instance = axios.create({
	baseURL:
		'https://noclegi-5b7a2-default-rtdb.europe-west1.firebasedatabase.app',
});
export default instance;
