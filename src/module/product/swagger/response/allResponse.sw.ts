import { ApiProperty } from '@nestjs/swagger';

class Product {
  @ApiProperty({
    example: 'string',
    description: 'Product ID',
  })
  _id: string;

  @ApiProperty({
    example: 'string',
    description: 'mahsulot nomi',
    required: true,
})
product_name?: string;


@ApiProperty({
    example: "number",
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
    example: 'date',
    description: 'Date when the Product was created',
  })
  createdAt: string;

  @ApiProperty({
    example: 'date',
    description: 'Date when the Product was last updated',
  })
  updatedAt: string;
}
export class Pagination {
    @ApiProperty({
        example:  "number", // Total Product count
        description: 'Total count of Products',
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

export class AllProductResponse {
  @ApiProperty({ type: [Product] })
  data: Product[];

  @ApiProperty({
    description: 'Pagination information',
  })
  pagination: Pagination
    
}
