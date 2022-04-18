import 'express-async-errors';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimiter from 'express-rate-limit';

import connectDB from './db/connect-db.js';
import Job from './models/Job.js';

// Import routes
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

// Import middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/authenticate.js';

// Import filepath dependencies
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const app = express();

if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(cors());
app.use(express.static(path.resolve(__dirname, './client/build')));

app.get('/api/v1', (req, res) => {
	res.send('API');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URL);

		app.listen(port, () => {
			console.log(`Server is listening on port ${port}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
