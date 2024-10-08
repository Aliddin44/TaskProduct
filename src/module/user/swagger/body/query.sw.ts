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
        description: 'nomi',
        required: false,
    })
    username?: string | null;


    @ApiProperty({
        description: 'role',
        required: false,
    })
    role?: string | null;


}