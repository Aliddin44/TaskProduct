import { ApiProperty } from '@nestjs/swagger';

class User {
  @ApiProperty({
    example: 'string',
    description: 'User ID',
  })
  _id: string;

  @ApiProperty({
    example: 'string',
    description: 'User email address',
    required: false,
  })
  email?: string;

  @ApiProperty({
    example: 'string',
    description: 'User username',
    required: false,
  })
  username?: string;

  @ApiProperty({
    example: 'string',
    description: 'User role',
  })
  role: string;

  @ApiProperty({
    example:  "number",
    description: 'User status (1 for active, 0 for inactive)',
  })
  status: number;

  @ApiProperty({
    example: 'date',
    description: 'Date when the user was created',
  })
  createdAt: string;

  @ApiProperty({
    example: 'date',
    description: 'Date when the user was last updated',
  })
  updatedAt: string;
}
export class Pagination {
    @ApiProperty({
        example:  "number", // Total user count
        description: 'Total count of users',
      })
      totalCount: number;
  
      @ApiProperty({
        example:  "number", // Items per page
        description: 'Number of items per page',
      })
      pageSize: number;
  
      @ApiProperty({
        example: "number", // Total pages
        description: 'Total number of pages',
      })
      pageCount: number;
  
      @ApiProperty({
        example: "number", // Current page number
        description: 'Current page number',
      })
      page: number;
    };

export class AllUserResponse {
  @ApiProperty({ type: [User] })
  data: User[];

  @ApiProperty({
    description: 'Pagination information',
  })
  pagination: Pagination
    
}
