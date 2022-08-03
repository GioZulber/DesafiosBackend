import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/Form/Login';
import { Register } from './components/Form/Register';
import { Home } from './components/Home/Home';
import { ConditionalHome } from './components/Home/ConditionalHome';

import { Navbar } from './components/Navbar/Navbar';
import { ListProducts } from './components/Products/ListProducts';
import { Cart } from './components/cart/Cart';
import { ToastContainer } from 'react-toastify';
import { Logout } from './components/User/Logout';
import { UserProvider } from './context/userContext';
import { PostPoducts } from './components/Form/PostProducts';
import { CartProvider } from './context/cartContext';
const routes = [
	{ path: '/', element: <Home /> },
	{ path: '/home', element: <ConditionalHome /> },
	{ path: '/products', element: <ListProducts /> },
	{ path: '/login', element: <Login /> },
	{ path: '/register', element: <Register /> },
	{ path: '/cart', element: <Cart /> },
	{ path: '/logout', element: <Logout /> },
	{ path: '/post-products', element: <PostPoducts /> },
	// { path: '/products', element: <Products /> },
];

function App() {
	return (
		<BrowserRouter>
			<UserProvider>
				<CartProvider>
					<Navbar />
					<Routes>
						{routes.map(({ path, element }, index) => (
							<Route key={index} path={path} element={element} />
						))}
					</Routes>
					<ToastContainer />
				</CartProvider>
			</UserProvider>
		</BrowserRouter>
	);
}

export default App;
