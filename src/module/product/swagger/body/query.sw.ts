import { ApiProperty } from '@nestjs/swagger';

export class QueryDes {
    @ApiProperty({
        example: 20,
        description: 'default 20',
        required: false,
    })
    limit?: number | null;

    @ApiProperty({
        example: 1,
        description: 'default 1',
        required: false,
    })
    skip?: number | null;
    @ApiProperty({
        description: 'mahsulot nomi bn qidirish',
        required: false,
    })
    product_name?: string | null;

    @ApiProperty({
        description: 'mahsulot narxi bn qidirish',
        required: false,
    })
    product_price?: number | null;


}