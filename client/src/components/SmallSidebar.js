import { NavLink } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

import Wrapper from '../assets/wrappers/SmallSidebar';
import NavLinks from './NavLinks';
import Logo from './Logo';
import { useAppContext } from '../context/appContext';
import links from '../utils/links';

const SmallSidebar = () => {
	const { showSidebar, toggleSidebar } = useAppContext();

	return (
		<Wrapper>
			<div
				className={
					showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
				}
			>
				<div className='content'>
					<button className='close-btn' onClick={toggleSidebar}>
						<FaTimes />
					</button>
					<header>
						<Logo />
					</header>
					<NavLinks onClick={toggleSidebar} />
				</div>
			</div>
		</Wrapper>
	);
};
export default SmallSidebar;
