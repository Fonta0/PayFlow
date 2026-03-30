import { Router } from 'express';
import { WebhookController } from './webhook.controller';

const router = Router();
const webhookController = new WebhookController();

// Note: In a real app we would use express.raw for webhooks
router.post('/stripe', webhookController.handle);

export { router as webhookRoutes };
