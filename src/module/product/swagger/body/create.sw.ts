import { ApiProperty } from '@nestjs/swagger';




export class createProduct{

    @ApiProperty({
        example: 'test',
        description: 'mahsulot nomi',
        required: true,
    })
    product_name?: string;


    @ApiProperty({
        example: 1200,
        description: 'mahsulot narxi',
        required: true,
    })
    product_price?: number;
   
    @ApiProperty({
      example: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      description: 'mahsulot  tafsifi',
      required: true,
    })
    product_description?: string;


    @ApiProperty({
      example: '/files/product/test.jpg',
      description: 'product surati',
      required: true,
    })
    product_image?: string;

    


   

   

}