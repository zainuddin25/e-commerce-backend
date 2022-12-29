import { Body, Controller, Get, HttpStatus, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AddCategoryDto } from './dto/addDto.dto';
import { CategoryService } from './category.service';
import { of } from 'rxjs'
import { join } from 'path'

export const imgCategory = {
    storage: diskStorage({
        destination: './uploads/category', 
        filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            cb(null, `${randomName}${extname(file.originalname)}`)
        }
    })
}

@Controller('category')
export class CategoryController {

    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async getAllProduct() {
        const [data, count] = await this.categoryService.getAll()

        return{
            data,
            count, 
            statusCode : HttpStatus.OK,
            message: 'Success'
        }
    }

    @Get('image/:fileName')
    findImage(@Param('fileName') fileName: string, @Res() res) {
        return of(res.sendFile(join(process.cwd(), 'uploads/category/' + fileName)))
    }

    @Post('image/category')
    @UseInterceptors(FileInterceptor('file', imgCategory))
    uploadImage(@UploadedFile() file : Express.Multer.File) {
        return `${file.filename}`
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('add')
    async addCategory(@Body() addCategoryDto: AddCategoryDto) {
        return this.categoryService.addCatogory(addCategoryDto)
    }

}
