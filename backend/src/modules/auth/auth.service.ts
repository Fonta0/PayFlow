import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../../errors/AppError';

const prisma = new PrismaClient();

export class AuthService {
  async register(data: any) {
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
      throw new AppError('Email already in use', 400);
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(email: string, pass: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }
    
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '1d' }
    );

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }
}
