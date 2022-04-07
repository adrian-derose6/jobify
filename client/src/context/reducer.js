import {
	CLEAR_ALERT,
	DISPLAY_ALERT,
	AUTH_USER_BEGIN,
	AUTH_USER_SUCCESS,
	AUTH_USER_ERROR,
} from './actions';

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
	throw Error(`No such action : ${action.type}`);
};

export default reducer;
