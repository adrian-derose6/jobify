import logo from '../assets/images/logo.svg';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';

const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<img src={logo} alt='jobify' className='logo' />
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
					<button className='btn btn-hero'>Login/Register</button>
				</div>
				<img src={main} alt='job-hunt' className='img main-img' />
			</div>
		</Wrapper>
	);
};

export default Landing;
