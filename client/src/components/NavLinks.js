import { NavLink } from 'react-router-dom';
import links from '../utils/links';

const NavLinks = ({ onClick }) => {
	return (
		<div className='nav-links'>
			{links.map((link) => {
				const { text, path, id, icon } = link;

				return (
					<NavLink
						to={path}
						className={({ isActive }) =>
							isActive ? 'nav-link active' : 'nav-link'
						}
						key={id}
						onClick={onClick}
					>
						<span className='icon'>{icon}</span>
						{text}
					</NavLink>
				);
			})}
		</div>
	);
};

export default NavLinks;
