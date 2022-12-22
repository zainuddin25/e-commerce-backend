import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './guards/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
  imports: [
    UsersModule, 
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '2d'
      }
    })
  ]
})
export class AuthModule {}
