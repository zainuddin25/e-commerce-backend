import { IsNotEmpty } from "class-validator";

export class EditProductDto {

    @IsNotEmpty()
    product_name: string

    @IsNotEmpty()
    ready_stock: number

    @IsNotEmpty()
    category: string

    @IsNotEmpty()
    price: string
}