import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderProduct {
  @ApiProperty({
    required: true,
    minLength: 1,
    format: 'UUIDV4',
    description: 'The id of the product bought',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  productId: string;

  @ApiProperty({
    required: true,
    type: Number,
    description: 'The quantity of the product bought',
  })
  @IsPositive()
  quantity: number;
}

export class Order {
  @ApiProperty({
    required: true,
    minLength: 1,
    format: 'UUIDV4',
    description: 'The id of the order',
  })
  id?: string;
  @ApiProperty({
    required: true,
    minLength: 1,
    format: 'UUIDV4',
    description: 'The user who creates the order',
  })
  customerId: string;
  @ApiProperty({
    required: true,
    minLength: 1,
    isArray: true,
    type: OrderProduct,
    description: 'The list of the items inside the order',
  })
  products: OrderProduct[];
}

export class CreateOrder {
  @ApiProperty({
    required: true,
    minLength: 1,
    format: 'UUIDV4',
    description: 'The user who creates the order',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  customerId: string;

  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty({
    required: true,
    minLength: 1,
    isArray: true,
    type: OrderProduct,
    description: 'The list of the items inside the order',
  })
  products: OrderProduct[];
}
