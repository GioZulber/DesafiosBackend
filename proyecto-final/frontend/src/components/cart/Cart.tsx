import { Box, Button, Flex, Heading, Spinner } from '@chakra-ui/react';
import { CartItem } from './CartItem';
import { useCart } from '../../context/cartContext';
import { Product } from '../Products/Product';
import { confirmCartOrder } from './cartService';
import { toast } from 'react-toastify';
import { useUser } from '../../context/userContext';

export const Cart = () => {
	const { user } = useUser();
	const { cart, totalPrice } = useCart();

	const isLoading = cart === undefined;

	const confirmOrder = async (id: number) => {
		try {
			const res = await confirmCartOrder(id);
			if (res?.status === 200) {
				toast.success('Pedido confirmado');
			}
			return res?.data;
		} catch (error) {
			console.log(error);
		}
	};

	return user !== null ? (
		<Flex p={50} w='full' direction={'column'} alignItems='center' justifyContent='center'>
			<Heading>Cart</Heading>
			{isLoading ? (
				<Box p={'2'} m={'2'}>
					<Spinner size='xl' color='green.500' />
				</Box>
			) : cart?.products.length > 0 ? (
				cart?.products.map((item: Product) => <CartItem key={item.id} item={item} />)
			) : (
				<>
					<Heading>No hay productos en el carrito</Heading>
					<Button as={'a'} href={'/products'} colorScheme={'teal'} m={'5'}>
						Ir a Products
					</Button>
				</>
			)}
			{cart?.products.length > 0 && (
				<Flex direction={'column'} alignItems={'center'} justifyContent={'center'}>
					<Heading m={'2'}>Total: ${totalPrice()}</Heading>
					<Button colorScheme={'whatsapp'} onClick={() => confirmOrder(cart.id)}>
						Confirmar Compra
					</Button>
				</Flex>
			)}
		</Flex>
	) : (
		<Flex p={50} w='full' direction={'column'} alignItems='center' justifyContent='center'>
			<Heading>Debes iniciar sesión</Heading>
			<Flex>
				<Button as={'a'} href={'/register'} colorScheme={'teal'} m={'5'}>
					Ir a Registro
				</Button>
				<Button as={'a'} href={'/login'} colorScheme={'teal'} m={'5'}>
					Ir a Login
				</Button>
			</Flex>
		</Flex>
	);
};
