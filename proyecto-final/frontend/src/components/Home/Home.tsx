import { Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/userContext';
import { AdminHome } from './AdminHome';
import { UserHome } from './UserHome';

export const Home: any = () => {
	const { user } = useUser();

	const roleHome = () => {
		if (user) {
			if (user.role === 'admin') {
				return <AdminHome user={user} />;
			}
			return <UserHome user={user} />;
		}
	};

	return user ? (
		roleHome()
	) : (
		<Stack p={20} display='flex' direction={'column'} align='center' justify='center'>
			<Flex
				width='100%'
				maxW={360}
				bg='gray.800'
				p='8'
				borderRadius={8}
				flexDir='column'
				align='center'>
				<Heading fontSize='4xl'>Home</Heading>

				<Flex direction={'column'} justify='center' alignItems='stretch' mt={4}>
					<Text fontSize='xs' color='gray.500' textAlign='center'>
						Por favor inicie session
					</Text>
					<Button as={RouterLink} colorScheme='teal' to='/login' mt='4' mb='2'>
						<Text fontWeight='bold'>Login</Text>
					</Button>
					<Text fontSize='xs' color='gray.500' textAlign='center'>
						O
					</Text>
					<Text fontSize='xs' color='gray.500' textAlign='center'>
						Si no tiene cuenta registrese
					</Text>

					<Button as={RouterLink} colorScheme='teal' to='/register' mt='4' mb='2'>
						<Text fontWeight='bold'>Register</Text>
					</Button>
				</Flex>
			</Flex>
		</Stack>
	);
};
