import {
	CLEAR_ALERT,
	DISPLAY_ALERT,
	AUTH_USER_BEGIN,
	AUTH_USER_SUCCESS,
	AUTH_USER_ERROR,
	LOGOUT_USER,
	TOGGLE_SIDEBAR,
	UPDATE_USER_BEGIN,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_ERROR,
	HANDLE_CHANGE,
	CLEAR_VALUES,
	CREATE_JOB_BEGIN,
	CREATE_JOB_SUCCESS,
	CREATE_JOB_ERROR,
	GET_JOBS_BEGIN,
	GET_JOBS_SUCCESS,
	SET_EDIT_JOB,
	EDIT_JOB_BEGIN,
	EDIT_JOB_SUCCESS,
	EDIT_JOB_ERROR,
	DELETE_JOB_BEGIN,
	SHOW_STATS_BEGIN,
	SHOW_STATS_SUCCESS,
	CLEAR_FILTERS,
	CHANGE_PAGE,
} from './actions';
import { initialState } from './appContext';

const reducer = (state, action) => {
	if (action.type === DISPLAY_ALERT) {
		return {
			...state,
			showAlert: true,
			alertType: 'danger',
			alertText: 'Please provide all values',
		};
	}
	if (action.type === CLEAR_ALERT) {
		return {
			...state,
			showAlert: false,
			alertType: '',
			alertText: '',
		};
	}
	if (action.type === AUTH_USER_BEGIN) {
		return {
			...state,
			isLoading: true,
		};
	}
	if (action.type === AUTH_USER_SUCCESS) {
		const { token, user, location, alertText } = action.payload;
		return {
			...state,
			isLoading: false,
			token,
			user,
			userLocation: location,
			jobLocation: location,
			showAlert: true,
			alertType: 'success',
			alertText,
		};
	}
	if (action.type === AUTH_USER_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg,
		};
	}
	if (action.type === UPDATE_USER_BEGIN) {
		return {
			...state,
			isLoading: true,
		};
	}
	if (action.type === UPDATE_USER_SUCCESS) {
		const { token, user, location } = action.payload;
		return {
			...state,
			isLoading: true,
			token,
			user,
			userLocation: location,
			jobLocation: location,
			showAlert: true,
			alertType: 'success',
			alertText: 'User Profile Updated!',
		};
	}
	if (action.type === UPDATE_USER_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg,
		};
	}
	if (action.type === LOGOUT_USER) {
		return {
			...initialState,
			user: null,
			token: null,
			userLocation: null,
			jobLocation: null,
		};
	}
	if (action.type === TOGGLE_SIDEBAR) {
		return {
			...state,
			showSidebar: !state.showSidebar,
		};
	}
	if (action.type === HANDLE_CHANGE) {
		return {
			...state,
			page: 1,
			[action.payload.name]: action.payload.value,
		};
	}
	if (action.type === CLEAR_VALUES) {
		const initialState = {
			isEditingJob: false,
			editJobId: '',
			position: '',
			company: '',
			jobLocation: state.userLocation,
			jobType: 'full-time',
			status: 'pending',
		};

		return { ...state, ...initialState };
	}
	if (action.type === CREATE_JOB_BEGIN) {
		return { ...state, isLoading: true };
	}
	if (action.type === CREATE_JOB_SUCCESS) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'success',
			alertText: 'New Job Created!',
		};
	}
	if (action.type === CREATE_JOB_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg,
		};
	}
	if (action.type === GET_JOBS_BEGIN) {
		return { ...state, isLoading: true, showAlert: false };
	}
	if (action.type === GET_JOBS_SUCCESS) {
		const { jobs, totalJobs, numOfPages } = action.payload;

		return {
			...state,
			isLoading: false,
			jobs,
			totalJobs,
			numOfPages,
		};
	}
	if (action.type === SET_EDIT_JOB) {
		const job = state.jobs.find((job) => job._id === action.payload.id);
		const { _id, position, company, jobLocation, jobType, status } = job;

		return {
			...state,
			isEditing: true,
			editJobId: _id,
			position,
			company,
			jobLocation,
			jobType,
			status,
		};
	}
	if (action.type === EDIT_JOB_BEGIN) {
		return { ...state, isLoading: true };
	}
	if (action.type === EDIT_JOB_SUCCESS) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'success',
			alertText: 'Job Update!',
		};
	}
	if (action.type === EDIT_JOB_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg,
		};
	}
	if (action.type === DELETE_JOB_BEGIN) {
		return {
			...state,
			isLoading: true,
		};
	}
	if (action.type === SHOW_STATS_BEGIN) {
		return {
			...state,
			isLoading: true,
			showAlert: false,
		};
	}
	if (action.type === SHOW_STATS_SUCCESS) {
		return {
			...state,
			isLoading: false,
			stats: action.payload.stats,
			monthlyApplications: action.payload.monthlyApplications,
		};
	}
	if (action.type === CLEAR_FILTERS) {
		return {
			...state,
			search: '',
			searchStatus: 'all',
			searchType: 'all',
			sort: 'latest',
		};
	}
	if (action.type === CHANGE_PAGE) {
		return {
			...state,
			page: action.payload.page,
		};
	}
	throw Error(`No such action : ${action.type}`);
};

export default reducer;
