import {
    ForbiddenException,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { InjectModel } from '@nestjs/mongoose';
  import * as argon from 'argon2';
  import mongoose from 'mongoose';
  import { User } from '../../schemas/user.schema';
  import { loginDto } from './dto';
  
  @Injectable()
  export class AuthService {
  
  
  
    // jwtService: any;
    constructor(
      @InjectModel(User.name) private userModel: mongoose.Model<User>,
      private readonly jwt: JwtService,
    ) { }
  /// get token
  async SignToken(
    userId: mongoose.Types.ObjectId,
    role: string, // Rolni ham payloadga qo‘shish mumkin
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      role: role, // Rolni token ichiga qo'shamiz
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1d', // Tokenning muddati 1 kun
      secret: process.env.JWT_SECRET, // JWT Secretni .env fayldan olish
    });
    return {
      access_token: token,
    };
  }
    /// admin yaratish funksiyasi
    async addadmin() {
      const password = '12345';
      const hash = await argon.hash(password);
      const user = await this.userModel.create({
        name: 'admin',
        email: 'admin@gmail.com',
        password: hash,
        role: 'admin',
      });
  
      return 'admin yaratildi';
    }
  
  
    /// signin func
    async login(dto: loginDto) {
      const user: any = await this.userModel
        .findOne({ email: dto.email })
  
      console.log(user);
  
      if (!user) throw new ForbiddenException('user is not exist!');
      if (user.status == 2) throw new UnauthorizedException('user status has suspended!');
      if (user.status == 3) throw new ForbiddenException('your profile has freezen!');
      const pwsMatches = await argon.verify(user.password, dto.password);
  
      if (!pwsMatches) throw new ForbiddenException('password is not valid!');
  
      const token = await this.SignToken(user._id, user.role);
      const user_one: any = await this.userModel
        .findOne({ email: dto.email })
        .select(
          '-password',
        ).lean();
      return {
        ...token,
        ...user_one,
      };
    }
    
    
  
  
    // checked email
    async check_login(email: string) {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        return {exist:false}
      }
      return  {exist:true};
    }
  
    async check_user(user: any) {
      const userOne: any = (await this.userModel.findOne({ _id: user }).select('-password').lean())
      if (!userOne)
        throw new HttpException(
          'user is not exist',
          HttpStatus.FORBIDDEN,
        );
      return { ...userOne };
    }
    async refreshAccessToken(accessToken: string): Promise<object> {
  try {
    console.log('Access Token:', accessToken);

    // Verify the old access token
    const decodedToken = await this.jwt.verifyAsync(accessToken, {
      secret: process.env.JWT_SECRET,
    });
    
    console.log('Decoded Token:', decodedToken);
    
    const userId = decodedToken.sub; // Foydalanuvchi ID
    const role = decodedToken.role; // Foydalanuvchi roli

    // Generate a new access token using the user information
    const newAccessToken = await this.generateAccessToken({ sub: userId, role: role });

    return {newAccessToken:newAccessToken};
  } catch (error) {
    console.error('Error refreshing access token:', error.message);
    throw new UnauthorizedException('Invalid access token');
  }
}
  
    async validateUser(token: any): Promise<any> {
      const user = this.jwt.verify(token);
      console.log('eeee',user);
      
      if (user) {
        return { ...user, roles: user.roles }; // Foydalanuvchining roli JWT token orqali qo'shiladi
      }
      return null;
    }
    async generateAccessToken(payload: { sub: mongoose.Types.ObjectId; role: string }): Promise<string> {
      return await this.jwt.signAsync(payload, {
        expiresIn: '7d', // Token muddati 7 kun
        secret: process.env.JWT_SECRET,
      });
    }
  }
