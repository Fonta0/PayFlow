import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DashboardService {
  async getMetrics(userId: string) {
    // 1. Calculate MRR (Monthly Recurring Revenue)
    const activeSubscriptions = await prisma.subscription.findMany({
      where: {
        customer: { userId },
        status: 'ACTIVE',
      },
    });

    const mrr = activeSubscriptions.reduce((acc, sub) => acc + sub.price, 0);

    // 2. Calculate Churn Rate (Canceled vs Total)
    const allSubscriptions = await prisma.subscription.findMany({
      where: { customer: { userId } },
    });

    const totalCount = allSubscriptions.length;
    const canceledCount = allSubscriptions.filter(sub => sub.status === 'CANCELED').length;
    
    // Simple churn percentage
    const churnRate = totalCount > 0 ? (canceledCount / totalCount) * 100 : 0;

    return { mrr, churnRate, activeCustomers: activeSubscriptions.length };
  }
}
