import { Order } from './orders.types';
import { Product } from '../products/products.types';
import { difference as _difference } from 'lodash';
import { SecuredUser } from '../users/users.types';
import { BadRequestException } from '@nestjs/common';

export class OrdersUtils {
  static validateOrder(
    order: Order,
    products: Product[],
    users: SecuredUser[],
  ): void {
    const userIds = users.map((user) => user.id);
    if (!userIds.includes(order.customerId)) {
      throw new BadRequestException(
        'Customer required for order placement could not be found',
      );
    }

    const orderProductIds = order.products.map((p) => p.productId);
    const existingProductIds = products.map((p) => p.id);
    const allProductsExist =
      _difference(existingProductIds, orderProductIds).length === 0;
    if (!allProductsExist) {
      throw new BadRequestException(
        'Products requested in the order could not be found',
      );
    }
  }
}
