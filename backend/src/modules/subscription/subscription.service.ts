import { PrismaClient } from '@prisma/client';
import { AppError } from '../../errors/AppError';
import { paymentGateway } from '../payment/services/PaymentGatewayService';
import { CustomerService } from '../customer/customer.service';

const prisma = new PrismaClient();
const customerService = new CustomerService();

export class SubscriptionService {
  async createSubscription(userId: string, data: { customerId: string; planName: string; price: number }) {
    // Ensure customer belongs to user
    const customer = await customerService.getCustomerById(userId, data.customerId);

    // Call simulated payment gateway
    const gatewaySub = await paymentGateway.createSubscription(customer.id, data.price, data.planName);

    const subscription = await prisma.subscription.create({
      data: {
        customerId: customer.id,
        planName: data.planName,
        price: data.price,
        status: gatewaySub.status.toUpperCase(),
      },
    });

    // Also create initial payment record
    await prisma.payment.create({
      data: {
        customerId: customer.id,
        subscriptionId: subscription.id,
        amount: data.price,
        status: 'PAID', // Simulater as instantly paid for MVP
        dueDate: new Date(),
        paidAt: new Date(),
      }
    });

    return subscription;
  }

  async listSubscriptions(userId: string) {
    return prisma.subscription.findMany({
      where: { customer: { userId } },
      include: { customer: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
