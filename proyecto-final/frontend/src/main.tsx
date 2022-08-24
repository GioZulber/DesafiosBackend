import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './styles/theme';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	// <React.StrictMode>
	<ChakraProvider theme={theme}>
		<App />
	</ChakraProvider>,
	{
		/* </React.StrictMode> */
	}
);
