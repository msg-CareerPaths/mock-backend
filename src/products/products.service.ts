import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product, SaveProduct } from './products.types';
import { v4 as uuidv4 } from 'uuid';
import { isNil as _isNil } from 'lodash';
import * as initialProducts from 'src/assets/products.json';

@Injectable()
export class ProductsService {
  private _productsRepository: Map<string, Product> = new Map<
    string,
    Product
  >();

  constructor() {
    this.seed();
  }

  private seed(): void {
    const initialProductsKeys = Object.keys(initialProducts);
    initialProductsKeys.forEach((key) => {
      this._productsRepository.set(key, initialProducts[key]);
    });
  }

  async createProduct(payload: SaveProduct): Promise<Product> {
    const id = uuidv4();
    const newProduct = {
      ...payload,
      id,
    };
    this._productsRepository.set(id, newProduct);
    return newProduct;
  }

  async updateProduct(id: string, payload: SaveProduct): Promise<Product> {
    if (_isNil(payload) || _isNil(id)) {
      throw new BadRequestException();
    }
    if (!this._productsRepository.has(id)) {
      throw new NotFoundException();
    }
    const updatedProduct: Product = {
      ...payload,
      id,
    };
    this._productsRepository.set(id, updatedProduct);
    return updatedProduct;
  }

  async removeProductById(id: string): Promise<void> {
    if (!this._productsRepository.has(id)) {
      throw new NotFoundException();
    }
    this._productsRepository.delete(id);
  }

  async getProductById(id: string): Promise<Product> {
    if (!this._productsRepository.has(id)) {
      throw new NotFoundException();
    }
    return this._productsRepository.get(id);
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this._productsRepository.values());
  }
}
