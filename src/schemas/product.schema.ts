
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserRole } from 'src/module/user/enums/role.enum';

export type ProductDocument = HydratedDocument<Product>;
   
@Schema({ timestamps: true })
export class Product {
  @Prop({ unique: true })
  product_name: string;  // mahsulotning nomi
  
  @Prop()
  product_price: number; /// mahsulotning narxi

  @Prop()
  product_description: string; /// mahsulotning narxi

  @Prop()
  product_image: string;  /// mahsulotning surati

 

}

export const ProductSchema = SchemaFactory.createForClass(Product);

