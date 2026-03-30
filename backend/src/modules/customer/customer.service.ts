import { PrismaClient } from '@prisma/client';
import { AppError } from '../../errors/AppError';
import { paymentGateway } from '../payment/services/PaymentGatewayService';

const prisma = new PrismaClient();

export class CustomerService {
  async createCustomer(userId: string, data: { name: string; email: string; document: string }) {
    const existing = await prisma.customer.findFirst({
      where: { document: data.document, userId },
    });

    if (existing) {
      throw new AppError('Customer with this document already exists', 400);
    }

    const customer = await prisma.customer.create({
      data: {
        ...data,
        userId,
      },
    });

    // Simulate Payment Gateway Customer Creation
    await paymentGateway.createCustomer(data.email, data.name);

    return customer;
  }

  async listCustomers(userId: string) {
    return prisma.customer.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCustomerById(userId: string, customerId: string) {
    const customer = await prisma.customer.findFirst({
      where: { id: customerId, userId },
      include: { subscriptions: true }
    });

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    return customer;
  }

  async updateCustomer(userId: string, customerId: string, data: { name?: string; document?: string }) {
    const customer = await this.getCustomerById(userId, customerId);

    return prisma.customer.update({
      where: { id: customer.id },
      data,
    });
  }

  async deleteCustomer(userId: string, customerId: string) {
    const customer = await this.getCustomerById(userId, customerId);

    await prisma.customer.delete({
      where: { id: customer.id },
    });

    return { message: 'Customer deleted successfully' };
  }
}
