import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({
    example: 'string',
    description: 'JWT access token'
  })
  access_token: string;

  @ApiProperty({
    example:  'string',
    description: 'User ID'
  })
  _id: string;

  @ApiProperty({
    example:  'string',
    description: 'User email address'
  })
  email: string;

  @ApiProperty({
    example:  'string',
    description: 'User role'
  })
  role: string;

  @ApiProperty({
    example: "number",
    description: 'User status'
  })
  status: number;

  @ApiProperty({
    example: "date",
    description: 'Account creation date'
  })
  createdAt: string;

  @ApiProperty({
    example: "date",
    description: 'Last account update date'
  })
  updatedAt: string;
}