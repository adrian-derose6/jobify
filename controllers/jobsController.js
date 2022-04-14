import { StatusCodes } from 'http-status-codes';

import Job from '../models/Job.js';
import {
	BadRequestError,
	NotFoundError,
	UnauthenticatedError,
} from '../errors/index.js';

export const createJob = async (req, res) => {
	const { position, company } = req.body;

	if (!position || !company) {
		throw new BadRequestError('Please provide all values');
	}

	req.body.createdBy = req.user.userId;
	const job = await Job.create(req.body);

	res.status(StatusCodes.CREATED).json({ job });
};

export const deleteJob = async (req, res) => {
	res.send('delete job');
};

export const updateJob = async (req, res) => {
	res.send('update job');
};

export const getAllJobs = async (req, res) => {
	const jobs = await Job.find({ createdBy: req.user.userId });
	res
		.status(StatusCodes.OK)
		.json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

export const showStats = async (req, res) => {
	res.send('show stats');
};
