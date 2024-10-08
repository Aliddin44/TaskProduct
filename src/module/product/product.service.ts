import { Injectable } from '@nestjs/common';
import { QueryDes } from './swagger';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Product } from '../../schemas/product.schema';
import { createProductDto, getDto } from './dto';

@Injectable()
export class ProductService {
     
    constructor(
        @InjectModel(Product.name) private ProductModel: mongoose.Model<Product>,
        @InjectModel(Product.name) private Product: mongoose.Model<Product>,
    ) { }
    shortFil(query: QueryDes): any {
        const product_name = query.product_name || null;
        const product_price = query.product_price || null;
    
        let fil: any = {};
    
        if (product_name)
            fil = { ...fil, title: { $regex: new RegExp(product_name.toLowerCase(), 'i') } };
        
        if(product_price) fil = {...fil, product_price}
    
        return fil;
    }
    
    async all(query: any) {
        const limit = query.limit || 20;
        const page = +query.page || 1;
        const skip = (page - 1) * limit;
        const fil = this.shortFil(query);
        console.log(fil);
    
        let data = await this.Product
              .find({ ...fil })
              .limit(limit)
              .skip(skip)
              .select('-password')
              .lean()
            
          
        const count = await this.ProductModel.find({ ...fil }).countDocuments();
        const pagination = {
            totalCount: count,
            pageSize: +limit,
            pageCount: Math.floor(count / +limit),
            page: skip,
        };
        return { data, pagination };
    }
    
    async getOne(id: any) {
    
        const Product_one = await this.ProductModel
            .findById(id)
    
    
        return Product_one;
    }
    
    async create(dto: createProductDto) {
    
        const Product = await this.ProductModel.create({...dto})
    
        const one_Product = await this.ProductModel
            .findById(Product._id)
    
        return one_Product;
    }
    
    
    async update(dto: createProductDto, params:getDto) {
    
        await this.ProductModel.findByIdAndUpdate(
            { _id: params.id },
            { ...dto },
            { new: true },
        );
    
        const one_Product = await this.ProductModel
            .findOne({ _id: params.id })
    
        return one_Product;
    }


    async delete(id: any) {
    
         await this.ProductModel
            .findByIdAndDelete(id)
    
    
        return {message:'deleted'};
    }
}
