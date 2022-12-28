import { Module } from '@nestjs/common';
import { TokoService } from './toko.service';
import { TokoController } from './toko.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Toko } from './entities/toko.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Toko, User])
  ],
  providers: [TokoService],
  controllers: [TokoController]
})
export class TokoModule {}
