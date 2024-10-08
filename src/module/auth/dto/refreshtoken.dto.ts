
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RefreshToken {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmU3Y2FhNjRhZjhiYWU2YmJjMGNhM2YiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mjc0MjY5MjksImV4cCI6MTcyNzUxMzMyOX0.K4Rc4AFNNufaFK7R-G_6QvD2zDIRCPRlquxE_3hp4pc',
  })
  @IsNotEmpty()
  @IsString()
  accessToken: string;

 
}