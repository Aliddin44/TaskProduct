import { IsMongoId, IsOptional, IsString, MaxLength } from "class-validator";

export class QueryFil {

    @IsString()
    @IsOptional()
    @MaxLength(50)
    username?: string | null;
  
    @IsMongoId()
    @IsOptional()
    role?: string | null;
    

}