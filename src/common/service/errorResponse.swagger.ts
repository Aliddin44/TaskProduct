import { ApiProperty } from "@nestjs/swagger";

// Bad response
export class UserBadResponse {
    @ApiProperty({ example: false })
    success: boolean;
  
    @ApiProperty({ example: 'HTTP status code representing the error (400 for bad request)' })
    error: string;
  
    @ApiProperty({ example: 400 })
    code: number;
  
    @ApiProperty({ example: null, type: () => Object }) // Use lazy type resolver
    data: null;
  }
  
  // Forbidden response
  export class UserForbiddenResponse {
    @ApiProperty({ example: false })
    success: boolean;
  
    @ApiProperty({ example: 'HTTP status code representing the error (401 for unauthorized)' })
    error: string;
  
    @ApiProperty({ example: 401 })
    code: number;
    @ApiProperty({ example: null, type: () => Object }) // Use lazy type resolver
  data: null;
  }
  
  // Not found response
  export class UserNotFoundResponse {
    @ApiProperty({ example: false })
    success: boolean;
  
    @ApiProperty({ example: 'HTTP status code representing the error (404 for resource not found)' })
    error: string;
  
    @ApiProperty({ example: 404 })
    code: number;
  
    @ApiProperty({ example: null, type: () => Object }) // Use lazy type resolver
    data: null;
  }