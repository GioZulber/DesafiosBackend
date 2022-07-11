function randomNumbers(cant) {
	const numbers = [];
	const min = 1;
	const max = 1000;
	for (let i = 0; i < cant; i++) {
		const number = Math.floor(Math.random() * (max - min)) + min;
		numbers.push(number);
	}
	const repeats = numbers.reduce((acc, cur) => {
		return acc[cur] ? ++acc[cur] : (acc[cur] = 1), acc;
	}, {});
	return repeats;
}

process.on('message', (cant) => {
	if (cant.length > 0) {
		const result = randomNumbers(cant);
		process.send(result);
		console.log('Child process finished');
	}
});
