import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';

export const register = async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		throw new Error('Please provide all values');
	}
	const user = await User.create({ name, email, password });
	res.status(StatusCodes.CREATED).json({ user });
};

export const login = async (req, res) => {
	res.send('login user');
};

export const updateUser = async (req, res) => {
	res.send('update user');
};
