import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersEndpointName, OrdersSwaggerTag } from './orders.constants';
import { OrdersService } from './orders.service';
import { CreateOrder, Order } from './orders.types';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(OrdersSwaggerTag)
@Controller(OrdersEndpointName)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  @ApiBody({
    description: 'The order creation payload',
    type: CreateOrder,
  })
  @ApiResponse({
    status: 201,
    type: Order,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Order could not be created due to invalid payload',
  })
  async createOrder(@Body() order: CreateOrder): Promise<Order> {
    return this.ordersService.createOrder(order);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: [Order],
    description: 'The orders list',
  })
  async retrieveOrders(): Promise<Order[]> {
    return this.ordersService.getOrders();
  }
}
