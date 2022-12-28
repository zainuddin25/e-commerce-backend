import { IsNotEmpty } from "class-validator";

export class UpdateRoleDto {

    @IsNotEmpty()
    role: []

}