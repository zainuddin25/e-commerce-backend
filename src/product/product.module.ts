import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { JwtStrategy } from 'src/auth/guards/jwt.strategy';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { Toko } from 'src/toko/entities/toko.entity';
import { Discount } from 'src/discount/entities/discount.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, User, Category, Toko, Discount]),
    ],
    controllers: [ProductController],
    providers: [ProductService, JwtStrategy],
    exports: [ProductService]
})
export class ProductModule {}
