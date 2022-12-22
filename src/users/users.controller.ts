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
import { UseGuards } from '@nestjs/common/decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    const [data, count] = await this.usersService.findAll()

    return {
      data,
      count,
      statusCode: HttpStatus.OK,
      message: 'success'
    }
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

}
