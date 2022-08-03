import { useState, FormEvent } from 'react';
import { Stack, Flex, Button, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Input } from './Input';
// import { loginUser } from '../User/userService';
import { toast } from 'react-toastify';
import { useUser } from '../../context/userContext';

type User = {
	email: string;
	password: string;
};

const initialState = {
	email: '',
	password: '',
};

export const Login = () => {
	const { loginUser } = useUser();

	const [data, setData] = useState<User>(initialState);

	const navigate = useNavigate();

	const handleChange = (e: FormEvent<HTMLInputElement>) => {
		setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
	};

	const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
		e.preventDefault();
		try {
			const singin = await loginUser(data);

			if (singin?.status === 200) {
				toast.success('Bienvenido');
				setTimeout(() => {
					navigate('/home');
				}, 1000);
				setData(initialState);
			}
			if (singin?.status === 401) {
				toast.error('Usuario o contraseña incorrectos');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const disabled = !data.email || !data.password;

	return (
		<Flex p={20} display='flex' direction={'column'} align='center' justify='center'>
			<Heading as='h1' size='xl' m={5}>
				Login
			</Heading>
			<Flex
				as='form'
				width='100%'
				maxW={360}
				bg='gray.800'
				p='8'
				borderRadius={8}
				flexDir='column'
				//Ava el onSubmit para que no se recargue la página
				onSubmit={handleSubmit}>
				<Stack spacing='2'>
					<Input name='email' type='email' label='E-mail' onChange={handleChange} />
					<Input
						name='password'
						type='password'
						label='Contraseña'
						onChange={handleChange}
					/>
				</Stack>

				<Button type='submit' mt='6' mb='2' colorScheme='purple' isDisabled={disabled}>
					Entrar
				</Button>
				<Text fontSize='xs' color='gray.500' textAlign='center'>
					Si no tienes cuenta
				</Text>
				<Button as='a' href='/register' mt='2' colorScheme='purple'>
					Registrarse
				</Button>
			</Flex>
		</Flex>
	);
};
