import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { createUserDto, getDto, QueryFil, updateUserDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: mongoose.Model<User>,
    ) { }
    shortFil(query: QueryFil): any {
        const username = query.username || null;
        

        let fil: any = {};

        if (username)
            fil = { ...fil, username: { $regex: new RegExp(username.toLowerCase(), 'i') } };
      

        return fil;
    }

    async all(query: any) {
        const limit = query.limit || 20;
        const page = +query.page || 1;
        const skip = (page - 1) * limit;
        const fil = this.shortFil(query);
        console.log(fil);

        const data:createUserDto[] = await this.userModel
            .find({ ...fil,role:{$ne:'admin'} })
            .limit(limit)
            .skip(skip)
            .select(
                '-password',
            );
        const count = await this.userModel.find({ ...fil }).countDocuments();
        const pagination = {
            totalCount: count,
            pageSize: +limit,
            pageCount: Math.floor(count / +limit),
            page: skip,
        };
        return { data, pagination };
    }

    async getOne(id: any) {
        console.log(id);

        const user_one = await this.userModel
            .findById(id).select('-password')


        return user_one;
    }

    async create(dto: createUserDto) {

        let password_hash = await argon.hash(dto.password);
        const user = await this.userModel.create({...dto, password:password_hash })

        const one_user = await this.userModel
            .findById(user._id).select(
                '-password',
            );

        return one_user;
    }


    async update(dto: updateUserDto,params:getDto) {
        if(dto.password){
            dto.password = await argon.hash(dto.password);
        }
        await this.userModel.findByIdAndUpdate(
            { _id: new Types.ObjectId(params.id)},
            { ...dto },
            { new: true },
        );

        const one_user = await this.userModel
            .findOne({ _id: params.id }).select(
                '-password',
            );

        return one_user;
    }
}
