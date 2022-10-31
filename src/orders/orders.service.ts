import { Injectable } from '@nestjs/common';
import { CreateOrder, Order } from './orders.types';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { OrdersUtils } from './orders.utils';

@Injectable()
export class OrdersService {
  private _ordersRepository: Map<string, Order> = new Map<string, Order>();

  constructor(
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  async createOrder(payload: CreateOrder): Promise<Order> {
    const id = uuidv4();
    const newOrder: Order = {
      ...payload,
      id,
    };

    const products = await this.productsService.getProducts();
    const users = await this.usersService.getAll();
    OrdersUtils.validateOrder(newOrder, products, users);

    this._ordersRepository.set(id, newOrder);
    return newOrder;
  }

  async getOrders(): Promise<Order[]> {
    return Array.from(this._ordersRepository.values());
  }
}
