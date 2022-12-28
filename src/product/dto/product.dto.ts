import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AddProductDto {

    @ApiProperty()
    @IsNotEmpty()
    product_name: string

    @IsNotEmpty()
    ready_stock: number

    @IsNotEmpty()
    price: string

    @IsNotEmpty()
    image: string

    @IsNotEmpty()
    category: string

    @IsNotEmpty()
    toko: string
}