import { useState } from 'react';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';

import { useAppContext } from '../context/appContext';
import Logo from './Logo';
import Wrapper from '../assets/wrappers/Navbar';

const Navbar = () => {
	const [showLogout, setShowLogout] = useState(false);
	const { toggleSidebar, user, logoutUser } = useAppContext();

	const toggleDropdown = () => {
		setShowLogout((prev) => !prev);
	};

	return (
		<Wrapper>
			<div className='nav-center'>
				<button className='toggle-btn' onClick={toggleSidebar}>
					<FaAlignLeft />
				</button>
				<div>
					<Logo />
					<h3 className='logo-text'>Dashboard</h3>
				</div>
				<div className='btn-container'>
					<button className='btn' onClick={toggleDropdown}>
						<FaUserCircle />
						{user?.name}
						<FaCaretDown />
					</button>
					<div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
						<button onClick={logoutUser} className='dropdown-btn'>
							Logout
						</button>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};
export default Navbar;
