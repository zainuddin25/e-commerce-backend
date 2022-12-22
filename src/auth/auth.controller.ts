import { Controller, Post, UseGuards, Request, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async signup(@Body() createUserDto: CreateUserDto) {
        return {
            data: await this.authService.signup(createUserDto),
            statusCode : HttpStatus.CREATED,
            messagge: 'success'
        }
    }

    @Post('login')
    async Login(@Body() request: LoginDto) {
        const res = await this.authService.login(request);
        return {
            statusCode: 200,
            message: 'Success',
            accessToken: res
        }
    }
}
