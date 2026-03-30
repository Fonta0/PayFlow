import { Request, Response } from 'express';

export class WebhookController {
  handle = (req: Request, res: Response) => {
    console.log('[Webhook Received]', req.body);
    // Real implementation would verify stripe signature
    // and update subscription/payment status in Prisma database
    res.status(200).send({ received: true });
  };
}
