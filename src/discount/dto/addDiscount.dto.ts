import { IsNotEmpty } from "class-validator";

export class AddDiscountDto {
    @IsNotEmpty()
    discount: string

    @IsNotEmpty()
    product: string
}