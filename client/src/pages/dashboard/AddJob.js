import { FormRow, FormRowSelect, Alert } from '../../components';
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
		jobTypeOptions,
		status,
		statusOptions,
		handleChange,
		clearValues,
		createJob,
		isLoading,
		editJob,
	} = useAppContext();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!position || !company || !jobLocation) {
			displayAlert();
			return;
		}

		if (isEditingJob) {
			editJob();
			return;
		}
		createJob();
	};

	const handleJobInput = (e) => {
		handleChange({ name: e.target.name, value: e.target.value });
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
						labelText='Job Location'
						name='jobLocation'
						value={jobLocation}
						handleChange={handleJobInput}
					/>
					<FormRowSelect
						name='status'
						value={status}
						handleChange={handleJobInput}
						list={statusOptions}
					/>
					<FormRowSelect
						name='jobType'
						labelText='Job Type'
						value={jobType}
						handleChange={handleJobInput}
						list={jobTypeOptions}
					/>
					<div className='btn-container'>
						<button
							className='btn btn-block submit-btn'
							type='submit'
							onClick={handleSubmit}
							disabled={isLoading}
						>
							Submit
						</button>
						<button
							type='button'
							className='btn btn-block clear-btn'
							onClick={clearValues}
						>
							Clear
						</button>
					</div>
				</div>
			</form>
		</Wrapper>
	);
};
export default AddJob;
