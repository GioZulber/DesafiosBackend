import { Flex } from '@chakra-ui/react';
import { Product } from './Product';
import { useState, useEffect } from 'react';
import { ProductCard } from './ItemProd';
import { getProducts } from './productService';

export const ListProducts = () => {
	// const [data, setData] = useState<Product[]>([]);
	const [data, setData] = useState([]);

	useEffect(() => {
		getProducts()
			.then((res) => setData(res.data.products))
			.catch((err) => console.log(err));
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
