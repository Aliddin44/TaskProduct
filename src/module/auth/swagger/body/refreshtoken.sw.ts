import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenSW {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmU3Y2FhNjRhZjhiYWU2YmJjMGNhM2YiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mjc0MjY5MjksImV4cCI6MTcyNzUxMzMyOX0.K4Rc4AFNNufaFK7R-G_6QvD2zDIRCPRlquxE_3hp4pc',
    description: 'JWT access token string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}