import { Router } from 'express';
import { CustomerController } from './customer.controller';
import { ensureAuthenticated } from '../../middlewares/auth';
import { validate } from '../../middlewares/validate';
import { z } from 'zod';

const router = Router();
const customerController = new CustomerController();

router.use(ensureAuthenticated);

const createSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    document: z.string().min(11), // CPF or CNPJ
  }),
});

const updateSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    document: z.string().min(11).optional(),
  }),
});

router.post('/', validate(createSchema), customerController.create);
router.get('/', customerController.list);
router.get('/:id', customerController.getById);
router.put('/:id', validate(updateSchema), customerController.update);
router.delete('/:id', customerController.delete);

export { router as customerRoutes };
