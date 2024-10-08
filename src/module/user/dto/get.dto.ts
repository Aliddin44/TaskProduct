

import { IsMongoId, IsNotEmpty, } from 'class-validator';
export class getDto {
    @IsMongoId()
    @IsNotEmpty()
    id: string;

   
}
