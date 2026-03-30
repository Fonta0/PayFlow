import { Router } from 'express';
import { DashboardController } from './dashboard.controller';
import { ensureAuthenticated } from '../../middlewares/auth';

const router = Router();
const dashboardController = new DashboardController();

router.use(ensureAuthenticated);

router.get('/metrics', dashboardController.getMetrics);

export { router as dashboardRoutes };
