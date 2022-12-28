import { Controller, DefaultValuePipe, Get, HttpStatus, ParseIntPipe, ParseUUIDPipe, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { Body, Delete, Param, Post, UseGuards, Put, Query, Req, } from '@nestjs/common/decorators';
import { AddProductDto } from './dto/product.dto';
import { AuthGuard } from '@nestjs/passport';
import { EditProductDto } from './dto/editProduct.dto';
import { Product } from './entities/product.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Roles } from 'src/users/role/roles.decorator';
import { Role } from 'src/users/role/role.enum';
import { RolesGuard } from 'src/users/role/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { of } from 'rxjs'

export const imgProduct = {
    storage: diskStorage({
      destination: './uploads/products'
      , filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
}

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
        @Query('search', new DefaultValuePipe('')) product_name: string,
        @Query('category', new DefaultValuePipe('all')) category: string
    ): Promise<Pagination<Product>> {
        return this.productService.paginate({page, limit}, product_name, category);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get(':id')
    async get(
        @Param('id', ParseUUIDPipe) id: string,
    ) {
        await this.productService.findOne(id)

        return this.productService.findOne(id)
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.Saller)
    @Post('add-product')
    @UseInterceptors(FileInterceptor('file', imgProduct))
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

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', imgProduct))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return `${file.filename}`
    }

    @Get('image/:fileName')
    findImage(@Param('fileName') fileName: string, @Res() res) {
        return of(res.sendFile(join(process.cwd(), 'uploads/products/' + fileName)))
    }
}
