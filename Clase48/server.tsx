import { createApp } from 'https://deno.land/x/servest@v1.3.1/mod.ts';
//  @deno-types="https://denopkg.com/soremwar/deno_types@master/react/v16.13.1/react.d.ts"
import React from 'https://jspm.dev/react@17.0.2';
// @deno-types="https://denopkg.com/soremwar/deno_types@master/react-dom/v16.13.1/server.d.ts";
import ReactDOMServer from 'https://jspm.dev/react-dom@17.0.2/server';
const app = createApp();
// deno-lint-ignore no-inferrable-types

const colors: (string | null)[] = [];

app.handle('/', async (req) => {
	const url = new URL('https://localhost:8080' + req.url);
	const color = url.searchParams.get('color');
	colors.push(color);
	console.log(colors);
	const list = colors.map((el) => (
		<li style={{ color: `${el}`, backgroundColor: 'black' }}> {el}</li>
	));

	await req.respond({
		status: 200,
		headers: new Headers({
			'content-type': 'text/html; charset=UTF-8',
		}),
		body: ReactDOMServer.renderToString(
			<html>
				<head>
					<meta charSet='utf-8' />
					<title> servest </title>
				</head>
				<body>
					<h2>Ingrese un color:</h2>
					<form
						style={{
							width: '50%',
							display: 'flex',
						}}
					>
						<div
							style={{
								border: '1px solid black',
								borderRadius: '5px',
							}}
						>
							<input type='text' name='color' placeholder='purple' />
							<button type='submit'>Ingresar</button>
						</div>
					</form>
					<ul style={{ width: '40%' }}>{list}</ul>
				</body>
			</html>
		),
	});
});
app.listen({ port: 8080 });
