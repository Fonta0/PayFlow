import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'fallback-secret'
    );

    const { id } = decoded as TokenPayload;

    req.user = {
      id,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
};
