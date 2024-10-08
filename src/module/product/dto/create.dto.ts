
import {    IsNotEmpty, IsNumber,  IsString } from 'class-validator';


export class createProductDto {

    @IsString()
    @IsNotEmpty()
    product_name?: string;

    
    @IsString()
    @IsNotEmpty()
    product_description?: string;

    @IsNumber()
    @IsNotEmpty()
    product_price?: number;


    @IsString()
    @IsNotEmpty()
    product_image?: string;


  

   

 
}
