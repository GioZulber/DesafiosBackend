import { extendTheme } from '@chakra-ui/react';

export default extendTheme({
	styles: {
		global: {
			'*': {
				padding: 0,
				margin: 0,
				boxSizing: 'border-box',
				body: {
					bg: 'gray.900',
					color: 'gray.50',
				},
			},
		},
		colors: {
			blue: '#0E273C',
		},
		fonts: {
			body: '"Roboto", sans-serif',
			heading: '"Roboto", sans-serif',
		},
	},
});
