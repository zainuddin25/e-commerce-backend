import { Injectable, HttpException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common/exceptions';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,


        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signup(createUserDto: CreateUserDto) {
        const checkusername = await this.userService.findUsername(
            createUserDto.username
        )

        if(checkusername.length) {
            throw new BadRequestException('Username has been used')
        }

        return await this.userService.create(createUserDto)
    }

    async validateUsers(username: string, pass: string) {
        const [ user ] = await this.userService.findUsername(username)

        if(user) {
            const matched = bcrypt.compare(pass, user.password)

            if (matched) {
                return user
            }
            throw new BadRequestException('Password False')
        }
        throw new BadRequestException('Username Not Found')
    }

    async login(request: LoginDto) {
        try {
            const existUser = await this.userRepository.findOne({
                relations: {
                    roles: true
                },
                where: {
                    username: request.username,
                    deletedAt: IsNull()
                }
            });

            if (!existUser) {
                throw new BadRequestException('User Not Found')
            }

            if(!await bcrypt.compare(request.password, existUser.password)) {
                throw new BadRequestException('Password Wrong')
            }

            const payload = await this.jwtService.signAsync({
                id: existUser.id,
                username: existUser.username,
                role: existUser.roles
            })

            return payload
            
        } catch (e){
            throw e
        }
    }

}
