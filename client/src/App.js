import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Landing, Register, Error } from './pages';
import {
	AddJob,
	AllJobs,
	Profile,
	Stats,
	SharedLayout,
} from './pages/dashboard';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index path='/' element={<SharedLayout />}>
					<Route path='stats' element={<Stats />} />
					<Route path='all-jobs' element={<AllJobs />} />
					<Route path='add-job' element={<AddJob />} />
					<Route path='profile' element={<Profile />} />
				</Route>
				<Route path='/register' element={<Register />} />
				<Route path='/landing' element={<Landing />} />
				<Route path='*' element={<Error />} />
			</Routes>
		</BrowserRouter>
	);
}
