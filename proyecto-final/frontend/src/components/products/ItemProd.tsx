import {
	Flex,
	Circle,
	Box,
	Image,
	Badge,
	useColorModeValue,
	Icon,
	chakra,
	Tooltip,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { Product } from './Product';

// const data = {
// 	isNew: true,
// 	imageURL:
// 		'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
// 	name: 'Wayfarer Classic',
// 	price: 4.5,
// 	rating: 4.2,
// };

interface Props {
	product: Product;
}

export const ProductCard = (props: Props) => {
	const { product } = props;
	return (
		<Box
			bg={useColorModeValue('white', 'gray.800')}
			w='200px'
			m={2}
			borderWidth='1px'
			rounded='lg'
			shadow='lg'
			position='relative'>
			{product.isNew && (
				<Circle size='10px' position='absolute' top={2} right={2} bg='red.200' />
			)}

			<Image src={product.imageURL} alt={`Picture of ${product.name}`} roundedTop='lg' />

			<Box p='4'>
				<Box display='flex' alignItems='baseline'>
					{product.isNew && (
						<Badge rounded='full' px='2' fontSize='0.6em' colorScheme='red'>
							New
						</Badge>
					)}
				</Box>
				<Flex mt='1' justifyContent='space-between' alignContent='center'>
					<Box fontSize='l' fontWeight='semibold' as='h4' lineHeight='tight'>
						{product.name}
					</Box>
					<Tooltip
						label='Add to cart'
						bg='white'
						placement={'top'}
						color={'gray.800'}
						fontSize={'1.2em'}>
						<chakra.a href={'#'} display={'flex'}>
							<Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
						</chakra.a>
					</Tooltip>
				</Flex>

				<Flex justifyContent='space-between' alignContent='center'>
					<Box fontSize='ll' color={useColorModeValue('gray.900', 'white')}>
						<Box as='span' color={'gray.600'} fontSize='lg'>
							$
						</Box>
						{product.price}
					</Box>
				</Flex>
			</Box>
		</Box>
	);
};
