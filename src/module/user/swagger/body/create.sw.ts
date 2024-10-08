import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../enums/role.enum';



export class createUser{

    @ApiProperty({
        example: 'test@gmail.com',
        description: 'foydalanuvchi emaili',
        required: true,
    })
    email?: string;


    @ApiProperty({
        example: '12345',
        description: 'foydalanuvchi paroli',
        required: true,
    })
    password?: string;
   
    @ApiProperty({
      example: 'testbek',
      description: 'foydalanuvchi nomi',
      required: true,
    })
    username?: string;



    @ApiProperty({
      example: 'driver',
      description: 'foydalanuvchi roli',
      required: true,
    })
    role?: UserRole;

   

}