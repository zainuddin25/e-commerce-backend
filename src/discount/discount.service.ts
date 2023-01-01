import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from './entities/discount.entity';
import { Repository } from 'typeorm';
import { AddDiscountDto } from './dto/addDiscount.dto';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class DiscountService {

    constructor( 
        @InjectRepository(Discount)
        private discountRepository: Repository<Discount>,

        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) {}

    async addDiscount(addDiscountDto: AddDiscountDto) {
        const findProduct = await this.productRepository.findOneOrFail({
            where: {
                id: addDiscountDto.product
            }
        })

        const discount = new Discount()
        discount.discount = addDiscountDto.discount,
        discount.product = findProduct

        await this.discountRepository.insert(discount)
        return this.discountRepository.findOne({
            where: {
                id: addDiscountDto.product
            },
            relations: {
                product: true
            }
        })

    }

    async getDiscount() {
        return this.discountRepository.findAndCount({
            relations: {
                product: {
                    toko: true
                }
            }
        })
    }
}
