import { Controller, HttpStatus } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards, Post, Body, Get } from '@Nestjs/common/decorators'
import { Roles } from 'src/users/role/roles.decorator';
import { Role } from 'src/users/role/role.enum';
import { AddDiscountDto } from './dto/addDiscount.dto';
import { get } from 'http';

@Controller('discount')
export class DiscountController {

    constructor(
        private readonly discountService: DiscountService
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Roles(Role.Saller)
    @Post('add-discount')
    async addDiscount(@Body() addDiscountDto: AddDiscountDto) {
        return this.discountService.addDiscount(addDiscountDto)
    }

    @Get()
    async getAllDiscount() {
        const [data, count] = await this.discountService.getDiscount()

        return {
            data, count, statusCode: HttpStatus.OK, message: 'success'
        }
    }
}
