import { Flex } from '@chakra-ui/react';
import { Product } from './Product';
import { useState, useEffect } from 'react';
import { ProductCard } from './ItemProd';
import { getProducts } from './productService';
import { useUser } from '../../context/userContext';

export const ListProducts = () => {
	const [data, setData] = useState<Product[]>([]);

	useEffect(() => {
		getProducts()
			.then((res) => setData(res?.data.products))
			.catch((err) => console.log(err));
	}, []);

	return (
		<Flex p={50} w='full' alignItems='center' justifyContent='center' color={'gray.900'}>
			{data?.map((item, index) => (
				<ProductCard product={item} key={index} />
			))}
		</Flex>
	);
};
