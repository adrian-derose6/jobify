import { Link } from 'react-router-dom';

import { Logo } from '../components';
import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main-alternative.svg';

const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className='container page'>
				{/* Info */}
				<div className='info'>
					<h1>
						Job <span>tracking</span> app
					</h1>
					<p>
						Track your job applications and keep your job search organized, all
						in one place
					</p>
					<Link to='/register' className='btn btn-hero'>
						Login/Register
					</Link>
				</div>
				<img src={main} alt='job-hunt' className='img main-img' />
			</div>
		</Wrapper>
	);
};

export default Landing;
