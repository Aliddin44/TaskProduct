
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class updateProductDto {


  
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    product_name?: string;

    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    product_description?: string;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()

    product_price?: number;


    @IsString()
    @IsNotEmpty()
    @IsOptional()

    product_image?: string;

}
