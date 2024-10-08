
import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {  UserRole } from '../enums/role.enum';


export class updateUserDto {


    @IsString()
    @IsNotEmpty()
    @IsOptional()

    email?: string;

    
    @IsString()
    @IsOptional()

    password?: string;


    @IsString()
    @IsOptional()

    username?: string;

    

    @IsString()

    @IsEnum(UserRole, { message: 'Role faqat admin, user bo‘lishi kerak' })
    @IsOptional()
    role: UserRole;

   
 
    @IsOptional()
    status?: number;
}
