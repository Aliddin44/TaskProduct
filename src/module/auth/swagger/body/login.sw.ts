import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";


export class LoginSW {
    @ApiProperty({
        example: 'admin@gmail.com',
        description: 'user email',
        required: false,
      })
      @IsString()
      @IsEmail()
      email?: string; 
      @ApiProperty({
        example: '12345',
        description: 'user password',
        required: false, 
      })
      @IsString()
      password?: string; 



}