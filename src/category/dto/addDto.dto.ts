import { IsNotEmpty } from "class-validator";

export class AddCategoryDto {

    @IsNotEmpty()
    category_name: string

    @IsNotEmpty()
    icon_category: string

}