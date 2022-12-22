import { IsNotEmpty } from "class-validator";

export class AddProductDto {

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
}