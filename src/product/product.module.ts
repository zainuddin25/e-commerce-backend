import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { JwtStrategy } from 'src/auth/guards/jwt.strategy';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, User, Category]),
    ],
    controllers: [ProductController],
    providers: [ProductService, JwtStrategy],
    exports: [ProductService]
})
export class ProductModule {}
