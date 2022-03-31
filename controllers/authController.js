import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';

export const register = async (req, res) => {
	const user = await User.create(req.body);
	res.status(StatusCodes.CREATED).json({ user });
};

export const login = async (req, res) => {
	res.send('login user');
};

export const updateUser = async (req, res) => {
	res.send('update user');
};