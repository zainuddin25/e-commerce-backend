import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { EntityNotFoundError, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddProductDto } from './dto/product.dto';
import { EditProductDto } from './dto/editProduct.dto';
import { User } from 'src/users/entities/user.entity';
import {
    paginate,
    Pagination,
    IPaginationOptions,
} from 'nestjs-typeorm-paginate'
import { Category } from 'src/category/entities/category.entity';
import { Toko } from 'src/toko/entities/toko.entity';
import { Discount } from 'src/discount/entities/discount.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,

        @InjectRepository(Toko)
        private tokoRepository: Repository<Toko>,

        @InjectRepository(Discount)
        private discountRepository: Repository<Discount>
    ) {}

    async paginate(options: IPaginationOptions, product_name : string, category: string): Promise<Pagination<Product>> {
        if (category === 'all') {
            return paginate<Product>(this.productRepository, options, {
                where : {
                    product_name : Like(`%${product_name}%`)
                },
                relations: {
                    category: true,
                    discount: true
                }
            });
        } else {
            return paginate<Product>(this.productRepository, options, {
                where : {
                    product_name : Like(`%${product_name}%`),
                    category: {
                        category_name: category
                    }
                },
                relations: {
                    category: true,
                    discount: true
                }
            });
        }
    }

    async search(product_name: string) {
        try{
            return await this.productRepository.findAndCount({
                where: {
                    product_name : Like(`%${product_name}%`)
                }
            })
        } catch(error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    error: 'Data Not Found'
                }, HttpStatus.NOT_FOUND )
            } else {
                throw error
            }
        }
    }

    async findAdll() {
        return this.productRepository.findAndCount({
            relations : {
                category: true,
                discount: true
            }
        })
    }

    async findOne(id: string) {
        try {
            return await this.productRepository.findOneOrFail({
                where: {
                    id
                }
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException(
                  {
                    statusCode: HttpStatus.NOT_FOUND,
                    error: 'Data not found',
                  },
                  HttpStatus.NOT_FOUND,
                );
              } else {
                throw error
              }
        }
    }

    async addProduct(addproductDto: AddProductDto) {

        const findToko = await this.tokoRepository.findOneOrFail({
            where: {
                id: addproductDto.toko
            }
        })

        const findCategory = await this.categoryRepository.findOneOrFail({
            where: {
                id: addproductDto.category
            }
        })

        const findDiscount = await this.discountRepository.findOneOrFail({
            where: {
                id: addproductDto.discount
            }
        })

        const product = new Product();
        product.product_name = addproductDto.product_name
        product.ready_stock = addproductDto.ready_stock
        product.price = addproductDto.price
        product.image = addproductDto.image
        product.category = findCategory
        product.toko = findToko
        // product.discount = findDiscount

        const result = await this.productRepository.insert(product)

        return this.productRepository.findOneOrFail({
            where: {
                id: result.identifiers[0].id
            },
            relations: {
                category: true
            }
        })
    }

    async deleteProduct(id: string) {
        try{
            await this.productRepository.findOneOrFail({
                where: {
                    id
                }
            });
        }catch(error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        message: 'Data Not Found'
                    },
                    HttpStatus.NOT_FOUND
                )
            } else {
                throw error
            }
        }

        await this.productRepository.delete(id)
    }

    async editProduct(id: string, editProductDto: EditProductDto) {
        try {
            await this.productRepository.findOneOrFail({
                where: {
                    id
                }
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException(
                  {
                    statusCode: HttpStatus.NOT_FOUND,
                    error: 'Data not found',
                  },
                  HttpStatus.NOT_FOUND,
                );
              } else {
                throw error;
              }
        }

        await this.productRepository.update(id, editProductDto);

        return this.productRepository.findOneOrFail({
            where: {
                id,
            }
        })
    }
}
