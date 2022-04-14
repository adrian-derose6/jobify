import React, { useReducer, useContext } from 'react';
import axios from 'axios';

import reducer from './reducer';
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
} from './actions';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');

const apiUrl = 'http://localhost:5000/api/v1';

const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: '',
	alertType: '',
	user: user ? JSON.parse(user) : null,
	token: token,
	userLocation: userLocation || '',
	showSidebar: false,
	isEditingJob: false,
	editJobId: '',
	position: '',
	company: '',
	jobLocation: userLocation || '',
	jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
	jobType: 'full-time',
	statusOptions: ['pending', 'interview', 'declined'],
	status: 'pending',
	jobs: [],
	totalJobs: 0,
	page: 1,
	numOfPages: 1,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	//axios
	const authFetch = axios.create({
		baseURL: `${apiUrl}`,
	});
	// Request interceptor
	authFetch.interceptors.request.use(
		(config) => {
			config.headers.common['Authorization'] = `Bearer ${state.token}`;
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);
	// Response interceptor
	authFetch.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			console.log(error.response);
			if (error.response.status === 401) {
				logoutUser();
			}
			return Promise.reject(error);
		}
	);

	const displayAlert = () => {
		dispatch({ type: DISPLAY_ALERT });
		clearAlert();
	};

	const clearAlert = () => {
		setTimeout(() => {
			dispatch({ type: CLEAR_ALERT });
		}, 3000);
	};

	const addUserToLocalStorage = ({ user, token, location }) => {
		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('token', token);
		localStorage.setItem('location', location);
	};

	const removeUserFromLocalStorage = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		localStorage.removeItem('location');
	};

	const authUser = async ({ currentUser, type = 'register' }) => {
		const endPoint = type === 'register' ? 'register' : 'login';
		const alertText =
			type === 'register'
				? 'User Created: Redirecting...'
				: 'Login Successful! Redirecting...';

		dispatch({
			type: AUTH_USER_BEGIN,
		});

		try {
			const { data } = await axios.post(
				`${apiUrl}/auth/${endPoint}`,
				currentUser
			);
			const { user, token, location } = data;

			dispatch({
				type: AUTH_USER_SUCCESS,
				payload: { user, token, location, alertText },
			});

			addUserToLocalStorage({
				user,
				token,
				location,
			});
		} catch (error) {
			dispatch({
				type: AUTH_USER_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};

	const updateUser = async (currentUser) => {
		dispatch({ type: UPDATE_USER_BEGIN });
		try {
			const { data } = await authFetch.patch('/auth/updateUser', currentUser);
			const { user, location, token } = data;

			dispatch({
				type: UPDATE_USER_SUCCESS,
				payload: { user, location, token },
			});

			addUserToLocalStorage({ user, location, token });
		} catch (error) {
			if (error.response.status !== 401) {
				dispatch({
					type: UPDATE_USER_ERROR,
					payload: { msg: error.response.data.msg },
				});
			}
		}
		clearAlert();
	};

	const logoutUser = () => {
		dispatch({ type: LOGOUT_USER });
		removeUserFromLocalStorage();
	};

	const toggleSidebar = () => {
		dispatch({
			type: TOGGLE_SIDEBAR,
		});
	};

	const handleChange = ({ name, value }) => {
		dispatch({
			type: HANDLE_CHANGE,
			payload: { name, value },
		});
	};

	const clearValues = () => {
		dispatch({ type: CLEAR_VALUES });
	};

	const createJob = async () => {
		dispatch({ type: CREATE_JOB_BEGIN });

		try {
			const { position, company, jobLocation, jobType, status, token } = state;

			await authFetch.post('/jobs', {
				company,
				position,
				jobLocation,
				jobType,
				status,
			});
			dispatch({
				type: CREATE_JOB_SUCCESS,
			});
			dispatch({ type: CLEAR_VALUES });
		} catch (error) {
			if (error.response.status === 401) return;

			dispatch({
				type: CREATE_JOB_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};

	const getJobs = async () => {
		let url = `url`;

		dispatch({ type: GET_JOBS_BEGIN });
		try {
			const { data } = await authFetch(url);
			const { jobs, totalJobs, numOfPages } = data;

			dispatch({
				type: GET_JOBS_SUCCESS,
				payload: {
					jobs,
					totalJobs,
					numOfPages,
				},
			});
		} catch (error) {
			logoutUser();
		}
		clearAlert();
	};

	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				toggleSidebar,
				authUser,
				updateUser,
				logoutUser,
				handleChange,
				clearValues,
				createJob,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

const useAppContext = () => {
	return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
