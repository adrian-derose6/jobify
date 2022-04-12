import { UnauthenticatedError } from '../errors/index.js';

const authenticateUser = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		throw new UnauthenticatedError('Authentication Invalid');
	}

	next();
};

export default authenticateUser;
