import { IsMongoId, IsOptional, IsString, MaxLength } from "class-validator";

export class QueryFil {

    @IsString()
    @IsOptional()
    @MaxLength(50)
    product_name?: string | null;
  
    @IsMongoId()
    @IsOptional()
    product_price?: number | null;
    

}