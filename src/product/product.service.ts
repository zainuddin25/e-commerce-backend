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

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,

        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async paginate(options: IPaginationOptions, product_name : string): Promise<Pagination<Product>> {
        return paginate<Product>(this.productRepository, options, {
            where : {
                product_name : Like(`%${product_name}%`)
            },
            relations: {
                user: true
            }
        });
    }

    async search(product_name: string) {
        try{
            return await this.productRepository.findAndCount({
                where: {
                    product_name : Like(`%${product_name}%`)
                },
                relations: {
                    user: true
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
                user: true
            }
        })
    }

    async findOne(id: string) {
        try {
            return await this.productRepository.findOneOrFail({
                where: {
                    id
                },   
                relations :{
                    user: true
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
        const product = new Product();

        const findUser = await this.userRepository.findOneOrFail({
            where: {
                id: addproductDto.user
            },
        })

        product.product_name = addproductDto.product_name
        product.ready_stock = addproductDto.ready_stock
        product.category = addproductDto.category
        product.price = addproductDto.price
        product.user = findUser
        product.image = addproductDto.image
        const result = await this.productRepository.insert(product)

        return this.productRepository.findOneOrFail({
            where: {
                id: result.identifiers[0].id
            },
            relations: {
                user: true
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
