import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUser } from '../context/userContext';

interface UserGuardProps {
	children: React.ReactNode;
}

export const UserGuard = ({ children }: UserGuardProps) => {
	const { isAuthenticated } = useUser();

	console.log('isAuthenticated', isAuthenticated);

	if (!isAuthenticated) {
		return toast.error('No tines acceso, inicia sesion.'), (<Navigate to={'/login'} />);
	}
	return <>{children}</>;
};
