import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AddProductDto {

    @ApiProperty()
    @IsNotEmpty()
    product_name: string

    @IsNotEmpty()
    ready_stock: number

    @IsNotEmpty()
    category: string

    @IsNotEmpty()
    price: string

    @IsNotEmpty()
    user: string

    @IsNotEmpty()
    image: string
}