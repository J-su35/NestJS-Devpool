import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Role } from "../entities/user.entity";

// Original code
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
    
    @IsEnum(Role)
    role: Role;
}

// for test exception isNotExists(message)
// export class CreateUserDto {
//     @IsString()
//     @IsNotEmpty()
//     username: string;

//     @IsString()
//     @IsNotEmpty()
//     password: string;
    
//     @IsEnum(Role)
//     role: Role;

//     @IsString()
//     @IsOptional()
//     description: string;
// }
