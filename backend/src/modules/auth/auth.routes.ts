import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validate } from '../../middlewares/validate';
import { z } from 'zod';

const router = Router();
const authController = new AuthController();

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

export { router as authRoutes };
