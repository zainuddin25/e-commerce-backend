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

export const img = {
    storage: diskStorage({
      destination: './uploads'
      , filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }

@Controller('images')
export class ImagesController {

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', img))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {
            data: file,
            statusCode: HttpStatus.CREATED,
            status: 'Success Uplaod'
        }
    }

    
    
}