import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CheckEmail {
    @ApiProperty({
        example: 'admin@gmail.com', description: 'user email' 
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()

    email: string;
}