import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { OrdersController } from './orders.controller';

@Module({
  imports: [UsersModule, ProductsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
