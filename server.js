import express from 'express';
import dotenv from 'dotenv';

import connectDB from './db/connect-db.js';

// Import routes
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

// Import middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Welcome!');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

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
