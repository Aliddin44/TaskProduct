import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../../schemas/product.schema';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { DecodedService } from '../auth/decoded/decoded.jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    AuthModule,
    
  ],
  controllers: [ProductController],
  providers: [ProductService,JwtService, DecodedService]
})
export class ProductModule {}
