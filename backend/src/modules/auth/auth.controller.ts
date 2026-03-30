import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { catchAsync } from '../../shared/catchAsync';

const authService = new AuthService();

export class AuthController {
  register = catchAsync(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const user = await authService.register({ name, email, password });
    res.status(201).json({ status: 'success', data: user });
  });

  login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    res.status(200).json({ status: 'success', data: { user, token } });
  });
}
