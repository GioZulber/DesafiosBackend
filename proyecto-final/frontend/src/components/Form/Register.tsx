import { FormEvent, useState } from 'react';
import { UserRegister } from '../User/User';
import { Stack, Flex, Button, Heading, Text, color } from '@chakra-ui/react';
import { Input } from './Input';
// import { registerUser } from '../User/userService';
import { toast } from 'react-toastify';
import { useHref, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/userContext';
export const Register = () => {
	const { registerUser } = useUser();

	const initialState = {
		email: '',
		name: '',
		password: '',
		address: '',
		phone: '',
		age: 0,
		avatar:
			'' ||
			'https://es.dreamstime.com/icono-de-usuario-predeterminado-vectores-imagen-perfil-avatar-predeterminada-vectorial-medios-sociales-retrato-image182347582',
	};

	const [data, setData] = useState<UserRegister>(initialState);

	const handleChange = (e: FormEvent<HTMLInputElement>) => {
		setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
	};

	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
		e.preventDefault();

		try {
			const signUp = await registerUser(data);

			if (signUp.status === 200) {
				toast.success('Bienvenido');
				navigate('/home');
			}
			if (signUp.status === 401) {
				toast.error('Error al registrarse');
				setData(initialState);
			}

			setData(initialState);
		} catch (error) {
			console.log(error);
		}
	};

	const disabled =
		!data.email || !data.name || !data.password || !data.address || !data.phone || !data.age;

	return (
		<Flex p={20} display='flex' direction={'column'} align='center' justify='center'>
			<Heading as='h1' size='xl' m={5}>
				Registrese
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
					<Input name='email' type='email' label='E-mail' onChange={handleChange} />
					<Input name='name' type='text' label='Nombre' onChange={handleChange} />
					<Input
						name='password'
						type='password'
						label='Contraseña'
						onChange={handleChange}
					/>
					<Input name='address' type='text' label='Dirección' onChange={handleChange} />
					<Input name='phone' type='text' label='Teléfono' onChange={handleChange} />
					<Input name='age' type='number' label='Edad' onChange={handleChange} />
					<Input name='avatar' type='text' label='Avatar' onChange={handleChange} />
				</Stack>

				<Button type='submit' mt='6' mb='2' colorScheme='purple' isDisabled={disabled}>
					Registrarse
				</Button>

				<Text fontSize='xs' color='gray.500' textAlign='center'>
					Si ya tienes cuenta
				</Text>
				<Button as='a' href='/login' mt='2' colorScheme='purple'>
					Login
				</Button>
			</Flex>
		</Flex>
	);
};
