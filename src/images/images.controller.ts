import { FileInterceptor } from '@nestjs/platform-express'
import { 
    Controller,
    Post,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { HttpStatus } from '@nestjs/common/enums';

export const imgProduct = {
    storage: diskStorage({
      destination: './uploads/products'
      , filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }

export const imgPP = {
    storage: diskStorage({
      destination: './uploads/photo-profile'
      , filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }

@Controller('images')
export class ImagesController {

    @Post('/product')
    @UseInterceptors(FileInterceptor('file', imgProduct))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {
            data: file,
            statusCode: HttpStatus.CREATED,
            status: 'Success Uplaod'
        }
    }

    @Post('/photo-profile')
    @UseInterceptors(FileInterceptor('file', imgPP))
    uplaodFile(@UploadedFile() file: Express.Multer.File) {
      return {
        data: file.filename,
        statusCode: HttpStatus.CREATED,
        status: 'Success Upload'
      }
    }

    
    
}