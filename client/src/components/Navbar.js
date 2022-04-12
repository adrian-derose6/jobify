import { useState } from 'react';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';

import { useAppContext } from '../context/appContext';
import Logo from './Logo';
import Wrapper from '../assets/wrappers/Navbar';

const Navbar = () => {
	const { toggleSidebar } = useAppContext();

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
					<button
						className='btn'
						onClick={() => console.log('show/hide dropdown')}
					>
						<FaUserCircle />
						John
						<FaCaretDown />
					</button>
					<div className='dropdown show-dropdown'>
						<button
							onClick={() => console.log('logout user')}
							className='dropdown-btn'
						>
							Logout
						</button>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};
export default Navbar;