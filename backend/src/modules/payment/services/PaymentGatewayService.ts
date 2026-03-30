import { randomUUID } from 'crypto';

export class PaymentGatewayService {
  /**
   * Simulates the creation of a customer in the Payment Gateway (like Stripe/Asaas)
   */
  async createCustomer(email: string, name: string): Promise<string> {
    console.log(`[Payment Gateway] Creating customer ${email}`);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return `cus_${randomUUID().replace(/-/g, '')}`; // Mock Stripe ID
  }

  /**
   * Simulates creating a subscription charge
   */
  async createSubscription(customerId: string, price: number, planName: string) {
    console.log(`[Payment Gateway] Creating subscription for ${customerId}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      id: `sub_${randomUUID().replace(/-/g, '')}`,
      status: 'active',
      clientSecret: `pi_${randomUUID().replace(/-/g, '')}_secret_${randomUUID()}`
    };
  }

  /**
   * Simulates Webhook trigger locally for testing/demo purposes
   */
  async triggerSimulatedWebhook(eventType: string, payload: any) {
    console.log(`[Payment Gateway] Simulating webhook: ${eventType}`);
    // In a real scenario, this would post to a local endpoint via axios
  }
}

export const paymentGateway = new PaymentGatewayService();
