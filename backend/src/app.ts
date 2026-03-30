import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';

import { authRoutes } from './modules/auth/auth.routes';
import { customerRoutes } from './modules/customer/customer.routes';
import { subscriptionRoutes } from './modules/subscription/subscription.routes';
import { dashboardRoutes } from './modules/dashboard/dashboard.routes';
import { webhookRoutes } from './modules/webhook/webhook.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/webhooks', webhookRoutes);

// Routes will be added here
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Global Error Handler
app.use(errorHandler);

export { app };
