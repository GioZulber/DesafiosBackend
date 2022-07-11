console.log('Hola mundo');

/* REGISTRO */
let containerForm = document.getElementById('container-form');
let buttonRegister = document.getElementById('register');
/* REGISTRO */

/* REGISTRO */
let user = {};
buttonRegister.addEventListener('click', (e) => {
	e.preventDefault();
	let name = document.getElementById('name').value;
	let password = document.getElementById('password').value;
	if (name === '' || password === '') {
		alert('Por favor llene todos los campos');
	} else {
		user = {
			name,
			password,
		};
		fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		}).then((res) => {
			console.log(res);
			if (res.status === 200) {
				window.location.href = res.url;
				console.log('Registro exitoso');
				containerForm.innerHTML = '';
			} else {
				console.log('Error al registrar');
			}
		});
	}
});
