import { Request, Response } from 'express';
import { CustomerService } from './customer.service';
import { catchAsync } from '../../shared/catchAsync';

const customerService = new CustomerService();

export class CustomerController {
  create = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const customer = await customerService.createCustomer(userId, req.body);
    res.status(201).json({ status: 'success', data: customer });
  });

  list = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const customers = await customerService.listCustomers(userId);
    res.status(200).json({ status: 'success', data: customers });
  });

  getById = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { id } = req.params;
    const customer = await customerService.getCustomerById(userId, id);
    res.status(200).json({ status: 'success', data: customer });
  });

  update = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { id } = req.params;
    const customer = await customerService.updateCustomer(userId, id, req.body);
    res.status(200).json({ status: 'success', data: customer });
  });

  delete = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { id } = req.params;
    await customerService.deleteCustomer(userId, id);
    res.status(204).send();
  });
}
