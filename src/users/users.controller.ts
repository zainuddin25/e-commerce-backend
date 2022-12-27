import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Query, Res, UseGuards } from '@nestjs/common/decorators';
import { DefaultValuePipe, ParseIntPipe } from '@nestjs/common/pipes';
import { Pagination } from 'nestjs-typeorm-paginate';
import { User } from './entities/user.entity';
import { of } from 'rxjs';
import { join } from 'path';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page : number,
    @Query('limit', new DefaultValuePipe(8), ParseIntPipe) limit: number,
    @Query('search', new DefaultValuePipe('')) username: string,
    @Query('role', new DefaultValuePipe('all')) role: string
  ): Promise<Pagination<User>> {
    return this.usersService.paginate({page, limit}, username, role);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.usersService.deleteUsers(id)

    return {
      statusCode: HttpStatus.OK,
      message: 'Delete Success'
    }
  }

  @Get('image/:fileName') 
  findImage(@Param('fileName') fileName: string, @Res() res) {
    return of(res.sendFile(join(process.cwd(), '/uploads/photo-profile/' + fileName)))
  }

}
