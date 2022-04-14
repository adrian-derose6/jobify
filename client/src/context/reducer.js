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
	throw Error(`No such action : ${action.type}`);
};

export default reducer;
