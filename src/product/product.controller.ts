import { Controller, DefaultValuePipe, Get, HttpStatus, ParseIntPipe, ParseUUIDPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { Body, Delete, Param, Post, UseGuards, Put, Query } from '@nestjs/common/decorators';
import { AddProductDto } from './dto/product.dto';
import { AuthGuard } from '@nestjs/passport';
import { EditProductDto } from './dto/editProduct.dto';
import { Product } from './entities/product.entity';
import { IPaginationLinks, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('')
    async index(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(8), ParseIntPipe) limit: number,
        @Query('search', new DefaultValuePipe('')) product_name: string
    ): Promise<Pagination<Product>> {
        return this.productService.paginate({page, limit}, product_name);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async get(@Param('id', ParseUUIDPipe) id: string) {
        await this.productService.findOne(id)

        return this.productService.findOne(id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('add-product')
    async addProduct(@Body() addProductDto: AddProductDto) {
        return this.productService.addProduct(addProductDto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('delete/:id')
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        await this.productService.deleteProduct(id)

        return {
            statusCode: HttpStatus.OK,
            message: 'Delete Success'
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async editProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() editProductDto: EditProductDto) {
        return {
            data: await this.productService.editProduct(id, editProductDto),
            statusCode: HttpStatus.OK,
            message: 'Data Edited'
        }
    } 

    @UseGuards(AuthGuard('jwt'))
    @Get('search/:product_name')
    async search(
        @Param('product_name') product_name : string
    ) {
        const [data, count] = await this.productService.search(product_name)
        return {
            data,
            count,
            statusCode: HttpStatus.OK,
            message: 'Success'
        }
    }

}
