import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/Form/Login';
import { Register } from './components/Form/Register';
import { Home } from './components/Home/Home';
import { Navbar } from './components/Navbar/Navbar';
import { ListProducts } from './components/Products/ListProducts';
import { Cart } from './components/cart/Cart';
import { ToastContainer } from 'react-toastify';
import { Logout } from './components/User/Logout';
import { UserProvider } from './context/userContext';
import { PostPoducts } from './components/Form/PostProducts';
const routes = [
	{ path: '/', element: <Home /> },
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
				<Navbar />
				<Routes>
					{routes.map(({ path, element }, index) => (
						<Route key={index} path={path} element={element} />
					))}
				</Routes>
				<ToastContainer />
			</UserProvider>
		</BrowserRouter>
	);
}

export default App;
