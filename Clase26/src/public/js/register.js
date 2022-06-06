console.log('Hola mundo');

/* REGISTRO */
let buttonRegister = document.getElementById('register');
/* REGISTRO */

/* REGISTRO */
buttonRegister.addEventListener('click', (e) => {
	e.preventDefault();
	let email = document.getElementById('email').value;
	let name = document.getElementById('name').value;
	let password = document.getElementById('password').value;
	if (name === '' || password === '' || email === '') {
		alert('Por favor llene todos los campos');
	} else {
		let user = {
			email,
			name,
			password,
		};
		console.log(user);
		fetch('/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		})
			.then((res) => {
				console.log(res);
				window.location.href = res.url;
			})
			.catch((err) => {
				console.log(err);
			});
	}
});
