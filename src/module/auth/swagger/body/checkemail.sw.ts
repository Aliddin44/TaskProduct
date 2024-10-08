import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CheckEmailSW {
  @ApiProperty({
    example: 'admin@gmail.com',
    description: 'user email',
    required: false, 
  })
  @IsString()
  @IsEmail()
  email?: string; 
}