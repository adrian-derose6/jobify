import { FormRow, Alert } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useAppContext } from '../../context/appContext';

const AddJob = () => {
	const {
		showAlert,
		displayAlert,
		position,
		company,
		jobLocation,
		isEditingJob,
		jobType,
		JobTypeOptions,
		status,
		statusOptions,
	} = useAppContext();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!position || !company || !jobLocation) {
			displayAlert();
			return;
		}
		console.log('create job');
	};

	const handleJobInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		console.log(`${name}: ${value}`);
	};

	return (
		<Wrapper>
			<form className='form'>
				<h3>{isEditingJob ? 'Edit Job' : 'Add Job'}</h3>
				{showAlert && <Alert />}

				<div className='form-center'>
					<FormRow
						type='text'
						name='position'
						value={position}
						handleChange={handleJobInput}
					/>
					<FormRow
						type='text'
						name='company'
						value={company}
						handleChange={handleJobInput}
					/>
					<FormRow
						type='text'
						name='location'
						value={jobLocation}
						handleChange={handleJobInput}
					/>
					<FormRow
						labelText='Job Type'
						type='text'
						name='jobType'
						value={jobType}
						handleChange={handleJobInput}
					/>
					<FormRow
						type='text'
						name='status'
						value={status}
						handleChange={handleJobInput}
					/>
				</div>
			</form>
		</Wrapper>
	);
};
export default AddJob;
