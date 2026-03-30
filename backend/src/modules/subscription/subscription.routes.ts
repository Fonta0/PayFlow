import { Router } from 'express';
import { SubscriptionController } from './subscription.controller';
import { ensureAuthenticated } from '../../middlewares/auth';
import { validate } from '../../middlewares/validate';
import { z } from 'zod';

const router = Router();
const subscriptionController = new SubscriptionController();

router.use(ensureAuthenticated);

const createSchema = z.object({
  body: z.object({
    customerId: z.string().uuid(),
    planName: z.string().min(2),
    price: z.number().positive(),
  }),
});

router.post('/', validate(createSchema), subscriptionController.create);
router.get('/', subscriptionController.list);

export { router as subscriptionRoutes };
