import { Request, Response } from 'express';
import { DashboardService } from './dashboard.service';
import { catchAsync } from '../../shared/catchAsync';

const dashboardService = new DashboardService();

export class DashboardController {
  getMetrics = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const metrics = await dashboardService.getMetrics(userId);
    res.status(200).json({ status: 'success', data: metrics });
  });
}
