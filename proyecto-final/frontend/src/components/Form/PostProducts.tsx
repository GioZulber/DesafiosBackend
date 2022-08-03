import { useState, FormEvent } from 'react';

import { Stack, Flex, Button, Heading, Text } from '@chakra-ui/react';
import { Input } from './Input';
import { Product } from '../Products/Product';
import { createProduct } from '../Products/productService';
import { toast } from 'react-toastify';

const initialState: Product = {
	title: '',
	description: '',
	code: '',
	thumbnail: '',
	price: 0,
	stock: 0,
};
export const PostPoducts = () => {
	const [data, setData] = useState<Product>(initialState);

	const handleChange = (e: FormEvent<HTMLInputElement>) => {
		setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
	};

	const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
		e.preventDefault();
		//Hacer el push a la base de datos
		const add = await createProduct(data);
		if (add?.status === 200) {
			toast.success('Producto agregado');
			setData(initialState);
		} else {
			toast.error('Error al agregar el producto');
			setData(initialState);
		}
	};

	return (
		<Flex p={20} display='flex' direction={'column'} align='center' justify='center'>
			<Heading as='h1' size='xl' m={5}>
				Agregar producto a la tienda
			</Heading>
			<Flex
				as='form'
				width='100%'
				maxW={360}
				bg='gray.800'
				p='8'
				borderRadius={8}
				flexDir='column'
				onSubmit={handleSubmit}>
				<Stack spacing='2'>
					<Input
						name='title'
						type='text'
						label='Nombre'
						onChange={handleChange}
						value={data.title}
					/>
					<Input
						name='description'
						type='text'
						label='Descripcion'
						onChange={handleChange}
						value={data.description}
					/>
					<Input
						name='code'
						type='text'
						label='Codigo'
						onChange={handleChange}
						value={data.code}
					/>
					<Input
						name='thumbnail'
						type='text'
						label='Imagen'
						onChange={handleChange}
						value={data.thumbnail}
					/>
					<Input
						name='price'
						type='price'
						label='Precio'
						onChange={handleChange}
						value={data.price}
					/>
					<Input
						name='stock'
						type='number'
						label='Stock'
						onChange={handleChange}
						value={data.stock}
					/>
				</Stack>

				<Button type='submit' mt='6' mb='2' colorScheme='purple'>
					Agregar
				</Button>
			</Flex>
		</Flex>
	);
};
