
import { IsArray, IsEnum,  IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {  UserRole } from '../enums/role.enum';


export class createUserDto {

    @IsString()
    @IsNotEmpty()
    email?: string;

    
    @IsString()
    password?: string;



    @IsString()
    username?: string;


    @IsString()
    @IsEnum(UserRole, { message: 'Role faqat admin, user bo‘lishi kerak' })
    role: UserRole;

   

    @IsOptional()
    status?: number;
}
