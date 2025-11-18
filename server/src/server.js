import express from 'express';
import cors from 'cors';

import productsRouter from './routes/products.js';
import ordersRouter from './routes/orders.js';
import paymentsRouter from './routes/payments.js';
import healthRouter from './routes/health.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json());

app.use('/api/health', healthRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/payments', paymentsRouter);

app.use(errorHandler);

export default app;

