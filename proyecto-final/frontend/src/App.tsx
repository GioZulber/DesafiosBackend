import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/Form/Login';
import { Register } from './components/Form/Register';
import { Home } from './components/Home/Home';
import { Navbar } from './components/Navbar/Navbar';
import { ListProducts } from './components/products/ListProducts';
import { Cart } from './components/cart/Cart';
import { ToastContainer } from 'react-toastify';
import { Logout } from './components/User/Logout';
import { UserProvider } from './context/userContext';
const routes = [
	{ path: '/', element: <Home /> },
	{ path: '/products', element: <ListProducts /> },
	{ path: '/login', element: <Login /> },
	{ path: '/register', element: <Register /> },
	{ path: '/cart', element: <Cart /> },
	{ path: '/logout', element: <Logout /> },
	// { path: '/products', element: <Products /> },
];

function App() {
	return (
		<UserProvider>
			<BrowserRouter>
				<Navbar />
				<Routes>
					{routes.map(({ path, element }, index) => (
						<Route key={index} path={path} element={element} />
					))}
				</Routes>
				<ToastContainer />
			</BrowserRouter>
		</UserProvider>
	);
}

export default App;
