import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CheckEmailResponceSW {
    @ApiProperty({
        example: "boolean",
        description: 'Simple boolean response'
      })
      exist: boolean; 
}