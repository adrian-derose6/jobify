import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';

import { useAppContext } from '../context/appContext';
import StatItem from './StatItem';
import Wrapper from '../assets/wrappers/StatsContainer';

const StatsContainer = () => {
	const { stats } = useAppContext();
	const defaultStats = [
		{
			title: 'Pending Applications',
			count: stats.pending || 0,
			icon: <FaSuitcaseRolling />,
			color: '#e9b949',
			bgc: '#fcefc7',
		},
		{
			title: 'Interviews Scheduled',
			count: stats.interview || 0,
			icon: <FaCalendarCheck />,
			color: '#647acb',
			bgc: '#e0e8f9',
		},
		{
			title: 'Jobs Declined',
			count: stats.declined || 0,
			icon: <FaBug />,
			color: '#d66a6a',
			bgc: '#ffeeee',
		},
	];

	return (
		<Wrapper>
			{defaultStats.map((item, index) => {
				return <StatItem key={index} {...item} />;
			})}
		</Wrapper>
	);
};
export default StatsContainer;
