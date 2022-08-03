import { Button, Flex, Heading, Icon, Image, Text } from '@chakra-ui/react';
import { FiTrash } from 'react-icons/fi';
import { Product } from '../Products/Product';
import { CartType } from './CartTypes';
import { removeProductFromCart } from './cartService';
import { useCart } from '../../context/cartContext';
import { toast } from 'react-toastify';

interface Props {
	item: Product;
}

export const CartItem = ({ item }: Props) => {
	const { cart } = useCart();

	const onClickDelete = async (item: Product) => {
		try {
			const res = await removeProductFromCart(cart.id, item);
			if (res?.status === 200) {
				toast.success('Producto eliminado');
			}
			return res?.data;
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Flex
			m={5}
			p={5}
			w='35rem'
			direction='row'
			alignItems='center'
			justifyContent='space-between'
			color={'gray.500'}
			bg={'gray.800'}
			rounded='lg'>
			<Flex direction={'column'} m={'5'}>
				<Heading as='h1' size='lg'>
					{item.title}
				</Heading>
				<Text> ${item.price}</Text>
			</Flex>
			<Image
				src={item.thumbnail}
				alt={`Picture of ${item.title}`}
				roundedTop='lg'
				w={'5rem'}
				h={'7rem'}
				m={'5'}
			/>
			<Button colorScheme={'red'} onClick={() => onClickDelete(item)}>
				<Icon as={FiTrash} h={7} w={7} alignSelf={'center'} />
			</Button>
		</Flex>
	);
};
