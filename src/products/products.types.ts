import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({
    format: 'UUIDV4',
    description: 'The uuid of the product',
    example: '2916a854-d829-46b1-a39c-bb5f74456296',
  })
  id: string;

  @ApiProperty({
    required: true,
    minLength: 1,
    description: 'The name of the product',
    example: 'Notebook Basic 15',
  })
  name: string;

  @ApiProperty({
    required: true,
    minLength: 1,
    description: 'The category of the product',
    example: 'Laptops',
  })
  category: string;

  @ApiProperty({
    required: true,
    minLength: 1,
    description: 'The image of the product',
    example:
      'https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1000.jpg',
  })
  image: string;

  @ApiProperty({
    required: true,
    type: Number,
    description: 'The price of the product',
    example: 524,
  })
  price: number;

  @ApiProperty({
    required: true,
    minLength: 1,
    description: 'The description of the product',
    example: 'Notebook Basic 15 with 2,80 GHz quad cor',
  })
  description: string;
}

export class SaveProduct {
  @ApiProperty({
    required: true,
    minLength: 1,
    description: 'The name of the product',
    example: 'Notebook Basic 15',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    minLength: 1,
    description: 'The category of the product',
    example: 'Laptops',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    required: true,
    minLength: 1,
    description: 'The image of the product',
    example:
      'https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1000.jpg',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    required: true,
    type: Number,
    description: 'The price of the product',
    example: 524,
  })
  @IsPositive()
  price: number;

  @ApiProperty({
    required: true,
    minLength: 1,
    description: 'The description of the product',
    example: 'Notebook Basic 15 with 2,80 GHz quad cor',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
