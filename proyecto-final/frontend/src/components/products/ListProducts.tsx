import { Flex } from '@chakra-ui/react';
import { Product } from './Product';
import { useState, useEffect } from 'react';
import { ProductCard } from './ItemProd';

export const ListProducts = () => {
	const [data, setData] = useState<Product[]>([]);

	useEffect(() => {
		setData([
			{
				isNew: true,
				imageURL:
					'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
				name: 'Wayfarer Classic',
				price: 4.5,
			},
			{
				isNew: true,
				imageURL:
					'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
				name: 'Wayfarer Classic',
				price: 4.5,
			},
			{
				isNew: true,
				imageURL:
					'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
				name: 'Wayfarer Classic',
				price: 4.5,
			},
		]);
	}, []);
	// console.log(data);

	return (
		<Flex p={50} w='full' alignItems='center' justifyContent='center' color={'gray.900'}>
			{data.map((item, index) => (
				<ProductCard product={item} key={index} />
			))}
		</Flex>
	);
};
