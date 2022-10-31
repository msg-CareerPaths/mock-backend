import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product, SaveProduct } from './products.types';
import { ProductsEndpointName, ProductsSwaggerTag } from './products.constants';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(ProductsSwaggerTag)
@Controller(ProductsEndpointName)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: Product,
    description: 'The product with the requested id',
  })
  @ApiResponse({
    status: 404,
    description: 'The product with the requested id could not be found  ',
  })
  async retrieveProductById(@Param('id') id: string): Promise<Product> {
    return this.productsService.getProductById(id);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: [Product],
    description: 'The product list',
  })
  async retrieveProducts(): Promise<Product[]> {
    return this.productsService.getProducts();
  }

  @Post()
  @ApiResponse({
    status: 201,
    type: Product,
    description: 'The product was created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Product could not be created due to invalid payload',
  })
  async createProduct(@Body() product: SaveProduct): Promise<Product> {
    return this.productsService.createProduct(product);
  }

  @Put(':id')
  @ApiBody({
    description: 'The product update payload',
    type: SaveProduct,
  })
  @ApiResponse({
    status: 200,
    type: Product,
    description: 'The product was updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Product could not be updated due to invalid payload',
  })
  @ApiResponse({
    status: 404,
    description: 'Product with the specified id could not be found',
  })
  async updateProduct(
    @Body() product: SaveProduct,
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The product was removed successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Product with the specified id could not be found',
  })
  async removeProduct(@Param('id') id: string): Promise<void> {
    return this.productsService.removeProductById(id);
  }
}
