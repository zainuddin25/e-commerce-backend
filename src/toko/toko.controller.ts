import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TokoService } from './toko.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/users/role/roles.guard';
import { Roles } from 'src/users/role/roles.decorator';
import { Role } from 'src/users/role/role.enum';
import { AddTokoDto } from './dto/add-toko.dto';

@Controller('toko')
export class TokoController {

    constructor(
        private readonly tokoService: TokoService
    ) {}

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.Saller)
    @Post('add-toko')
    async addToko(@Body() addTokoDto: AddTokoDto) {
        return this.tokoService.createToko(addTokoDto)
    }

}
