import { IsNotEmpty } from "class-validator";

export class AddTokoDto {
    @IsNotEmpty()
    toko_name: string

    @IsNotEmpty()
    user: string
}