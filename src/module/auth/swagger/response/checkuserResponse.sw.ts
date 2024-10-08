import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({
    example: "string",
    description: 'User ID'
  })
  _id: string;

  @ApiProperty({
    example: "string",
    description: 'User email address'
  })
  email: string;

  @ApiProperty({
    example: "string",
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
    description: 'Date when the user was created'
  })
  createdAt: string;

  @ApiProperty({
    example: "date",
    description: 'Date when the user was last updated'
  })
  updatedAt: string;
}