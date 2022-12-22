import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { JwtStrategy } from 'src/auth/guards/jwt.strategy';
import { User } from 'src/users/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, User]),
    ],
    controllers: [ProductController],
    providers: [ProductService, JwtStrategy],
    exports: [ProductService]
})
export class ProductModule {}
