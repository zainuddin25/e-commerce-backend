import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityNotFoundError, Repository, Like } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from './entities/role.entity';
import * as bcrypt from 'bcrypt'
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {}

  async paginate(options: IPaginationOptions, username : string, role : string): Promise<Pagination<User>> {
    if (role === 'all') {
      return paginate<User>(this.usersRepository, options, {
        where : {
            username : Like(`%${username}%`)
        },
        relations: {
            roles: true,
            toko: {
              product: true
            }
        }
      });
    } else {
      return paginate<User>(this.usersRepository, options, {
        where : {
            username : Like(`%${username}%`),
            roles: {
              name: role,
            }
        },
        relations: {
            roles: true,
            toko: {
              product: true
            }
        }
      });
    }
  }
  
  async findOne(id: string) {
    try {
      return await this.usersRepository.findOneOrFail({
        where: {
          id,
        },
        relations: {
          roles: true,
          toko: {
            product: true
          }
        }
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }
  }

  async findUsername(username: string) {
    return this.usersRepository.find({ where: { username } });
  }

  async findUser() {
    return await this.roleRepository.find({
      where : {
        id: process.env.ROLE_USER,
      }
    })
  }

  async findRoleSaller() {
    return await this.roleRepository.find({
      where: {
        id: process.env.ROLE_SALLER
      }
    })
  }

  async findAll() {
    return this.usersRepository.findAndCount({
      relations : {
        roles: true,
        toko: {
          product: true
        }
      }
    })
  }

  async create(createUserDto: CreateUserDto) {
    const userRole = await this.findUser();

    const user = new User();
    const hashPassword = await bcrypt.hash(createUserDto.password, 12)
    user.username = createUserDto.username,
    user.password = hashPassword,
    user.roles = userRole
    user.email = createUserDto.email
    user.photo_profile = createUserDto.photo_profile
    user.toko = null

    return await this.usersRepository.save(user)
  }

  async updateRoleSaller(id: string) {

    try {
      const roleSaller = await this.findRoleSaller()

      const user = new User()
      user.id = id,
      user.roles = roleSaller

      await this.usersRepository.save(user)

      return this.usersRepository.findOneOrFail({
        where: {
          id: id
        }, 
        relations : {
          roles : true,
          toko: {
            product: true
          }
        }
      }) 
    } catch (error) {
      console.log(error)
    }
  }

  async deleteUsers(id: string) {
    try{
      await this.usersRepository.findOneOrFail({
        where: {
          id
        }
      })
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HttpException({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'User Not Found'
          },
          HttpStatus.NOT_FOUND
        )
      } else {
        throw error
      }
    }

    return this.usersRepository.delete(id)
  }

}
