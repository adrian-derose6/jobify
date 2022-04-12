import { NavLink } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

import Wrapper from '../assets/wrappers/SmallSidebar';
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
					<div className='nav-links'>
						{links.map((link) => {
							const { text, path, id, icon } = link;

							return (
								<NavLink
									to={path}
									className={({ isActive }) =>
										isActive ? 'nav-link active' : 'nav-link'
									}
									ket={id}
									onClick={toggleSidebar}
								>
									<span className='icon'>{icon}</span>
									{text}
								</NavLink>
							);
						})}
					</div>
				</div>
			</div>
		</Wrapper>
	);
};
export default SmallSidebar;
