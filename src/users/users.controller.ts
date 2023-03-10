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
import { AuthGuard } from '@nestjs/passport';
import { Query, Res, UseGuards } from '@nestjs/common/decorators';
import { DefaultValuePipe, ParseIntPipe } from '@nestjs/common/pipes';
import { Pagination } from 'nestjs-typeorm-paginate';
import { User } from './entities/user.entity';
import { of } from 'rxjs';
import { join } from 'path';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Get()
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page : number,
    @Query('limit', new DefaultValuePipe(8), ParseIntPipe) limit: number,
    @Query('search', new DefaultValuePipe('')) username: string,
    @Query('role', new DefaultValuePipe('all')) role: string
  ): Promise<Pagination<User>> {
    return this.usersService.paginate({page, limit}, username, role);
  }

  @Get('image/:fileName') 
  findImage(@Param('fileName') fileName: string, @Res() res) {
    return of(res.sendFile(join(process.cwd(), '/uploads/photo-profile/' + fileName)))
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update-role/:id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRoleDto: UpdateRoleDto
  ) {
    return {
      data: await this.usersService.updateRoleSaller(id),
      statusMessage: HttpStatus.OK,
      status: 'Updated'
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
