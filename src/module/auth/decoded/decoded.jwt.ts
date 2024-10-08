import { Injectable, UnauthorizedException } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';
// import { User } from 'src/user/user';

@Injectable()
export class DecodedService {
  constructor(
   
  ) { }
  async decoded(req: any): Promise<any> {
    console.log('sss', req.headers);
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Authorization token not provided');
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}