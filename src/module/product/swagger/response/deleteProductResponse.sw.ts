import { ApiProperty } from "@nestjs/swagger";

export class DeleteProductResponse {
    @ApiProperty({
      example: "deleted",
      description: 'deleted'
    })
    message: string;
  
  
  }