import { ApiProperty } from "@nestjs/swagger";

export class OneProductResponse {
    @ApiProperty({
      example: "string",
      description: 'User ID'
    })
    _id: string;
  
    @ApiProperty({
      example: 'string',
      description: 'mahsulot nomi',
      required: true,
  })
  product_name?: string;


  @ApiProperty({
      example: 'number',
      description: 'mahsulot narxi',
      required: true,
  })
  product_price?: number;
 
  @ApiProperty({
    example: "string",
    description: 'mahsulot  tafsifi',
    required: true,
  })
  product_description?: string;


  @ApiProperty({
    example: 'string',
    description: 'product surati',
    required: true,
  })
  product_image?: string;

  
    @ApiProperty({
      example:"date",
      description: 'Date when the user was created'
    })
    createdAt: string;
  
    @ApiProperty({
      example: 'date',
      description: 'Date when the user was last updated'
    })
    updatedAt: string;
  }