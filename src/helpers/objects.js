export const getArrayFromObject = (res) => {
	const arr = [];
	for (const key in res.data) {
		arr.push({ ...res.data[key], id: key });
	}
	return arr;
};
