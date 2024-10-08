import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class loginDto {
  @ApiProperty({
    example: 'admin@gmail.com', description: 'user email' 
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345', description: 'user password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}