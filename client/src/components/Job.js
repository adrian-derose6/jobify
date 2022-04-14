import { Link } from 'react-router-dom';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import moment from 'moment';

import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';
import { useAppContext } from '../context/appContext';

const Job = ({
	_id,
	position,
	company,
	jobLocation,
	jobType,
	createdAt,
	status,
}) => {
	const { setEditJob, deleteJob } = useAppContext();

	let date = moment(createdAt);
	date = date.format('MMM Do, YYYY');

	return (
		<Wrapper>
			<header>
				<div className='main-icon'>{company.charAt(0)}</div>
				<div className='info'>
					<h5>{position}</h5>
					<p>{company}</p>
				</div>
			</header>
			<div className='content'>
				<footer>
					<div className='actions'>
						<Link
							to='/add-job'
							onClick={() => setEditJob(_id)}
							className='btn edit-btn'
						>
							Edit
						</Link>
						<button
							type='button'
							className='btn delete-btn'
							onClick={() => deleteJob(_id)}
						>
							Delete
						</button>
					</div>
				</footer>
			</div>
		</Wrapper>
	);
};

export default Job;