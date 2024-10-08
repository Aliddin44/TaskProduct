
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserRole } from '../module/user/enums/role.enum';

export type UserDocument = HydratedDocument<User>;
   
@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true })
  email: string;  // foydalanuvchining tizimda foydalanadgan logini
  @Prop()
  password: string; // foydalanuvchining tizimda foydalanadgan paroli

  @Prop()
  username: string;  /// foydalanuvchi ismi

  @Prop({
    enum: UserRole,
  })
  role: string;

  @Prop({
    default: 1
  })
  status: number; // 1 actice 2 noactive 3 freezen

}

export const UserSchema = SchemaFactory.createForClass(User);
