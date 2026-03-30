import { Request, Response } from 'express';
import { SubscriptionService } from './subscription.service';
import { catchAsync } from '../../shared/catchAsync';

const subscriptionService = new SubscriptionService();

export class SubscriptionController {
  create = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const subscription = await subscriptionService.createSubscription(userId, req.body);
    res.status(201).json({ status: 'success', data: subscription });
  });

  list = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const subscriptions = await subscriptionService.listSubscriptions(userId);
    res.status(200).json({ status: 'success', data: subscriptions });
  });
}
