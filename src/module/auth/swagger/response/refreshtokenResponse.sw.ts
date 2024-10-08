import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenResponse {
  @ApiProperty({
    example:"string",
    description: 'The new access token',
  })
  newAccessToken: string;
}