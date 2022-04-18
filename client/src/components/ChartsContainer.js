import { useState } from 'react';

import JobsBarChart from './JobsBarChart';
import JobsAreaChart from './JobsAreaChart';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/ChartsContainer';

const ChartsContainer = () => {
	const [barChart, setBarChart] = useState(true);
	const { monthlyApplications: data } = useAppContext();

	const toggleChart = () => {
		setBarChart((prevState) => !prevState);
	};

	return (
		<Wrapper>
			<h4>Monthly Applications</h4>
			<button type='button' onClick={toggleChart}>
				{barChart ? 'Area Chart' : 'Bar Chart'}
			</button>
			{barChart ? <JobsBarChart data={data} /> : <JobsAreaChart data={data} />}
		</Wrapper>
	);
};

export default ChartsContainer;
