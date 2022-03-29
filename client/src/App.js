import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Landing from './pages/Landing';
import styled from 'styled-components';

export default function App() {
	return (
		<BrowserRouter>
			<nav>
				<Link to='/'>Dashboard</Link>
				<Link to='/register'>Register</Link>
				<Link to='/landing'>Dashboard</Link>
			</nav>
			<Routes>
				<Route path='/' element={<div>Dashboard</div>} />
				<Route path='/register' element={<div>Register</div>} />
				<Route path='/landing' element={<Landing />} />
				<Route path='*' element={<div>Error</div>} />
			</Routes>
		</BrowserRouter>
	);
}
