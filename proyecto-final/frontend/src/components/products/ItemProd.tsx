import { MouseEventHandler } from 'react';
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
	Button,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { useUser } from '../../context/userContext';
import { Product } from './Product';
import { deleteProduct, updateProduct } from './productService';
import { useNavigate } from 'react-router-dom';
import { addProductToCart } from '../cart/cartService';
import { Cart } from '../cart/Cart';
import { CartType } from '../cart/CartTypes';

interface Props {
	product: Product;
}

export const ProductCard = (props: Props) => {
	const { product } = props;
	const { user } = useUser();

	const id = product.id;

	// const onClickUpdate = async (product: Product) => {

	// };
	const navigate = useNavigate();

	const onClickDelete = async (id: number): Promise<Product> => {
		const res = await deleteProduct(id);
		if (res?.status === 200) {
			console.log('Producto eliminado');
			navigate('/products');
		}
		return res?.data;
	};

	const onClickAddToCart = async (product: Product) => {
		if (user) {
			const res = await addProductToCart(user.id, product);
			if (res?.status === 200) {
				console.log('Producto agregado al carrito');
			}
			return res?.data;
		}
	};

	return (
		<Box
			bg={'white'}
			w='220px'
			m={2}
			borderWidth='1px'
			rounded='lg'
			shadow='lg'
			position='relative'>
			<Image
				src={product.thumbnail}
				alt={`Picture of ${product.title}`}
				roundedTop='lg'
				w={'100%'}
			/>

			<Box p='4'>
				<Flex mt='1' justifyContent='space-between' alignContent='center'>
					<Box fontSize='l' fontWeight='semibold' as='h4' lineHeight='tight'>
						{product.title}
					</Box>
					<Tooltip
						label='Add to cart'
						bg='white'
						placement={'top'}
						color={'gray.800'}
						fontSize={'1.2em'}>
						<Button display={'flex'} onClick={() => onClickAddToCart(product)}>
							<Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
						</Button>
					</Tooltip>
				</Flex>

				<Flex justifyContent='space-between' alignContent='center'>
					<Box fontSize='ll' color={useColorModeValue('gray.900', 'white')}>
						<Box as='span' color={'gray.600'} fontSize='lg'>
							${product.price}
						</Box>
					</Box>
				</Flex>

				{user?.role === 'admin' && (
					<Flex mt='2' direction={'column'} justifyContent={'center'}>
						<Button
							// onClick={() => onClickUpdate(product)}
							variant={'solid'}
							colorScheme={'teal'}
							size={'sm'}
							m={'1'}>
							Actualizar
						</Button>
						<Button
							onClick={() => onClickDelete(id!)}
							variant={'solid'}
							colorScheme={'teal'}
							size={'sm'}
							m={'1'}>
							Borrar
						</Button>
					</Flex>
				)}
			</Box>
		</Box>
	);
};
