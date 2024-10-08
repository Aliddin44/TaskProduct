import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    ForbiddenException,
  } from '@nestjs/common';
  import { AuthService } from '../../module/auth/auth.service';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private readonly jwt: JwtService) { }
    validateToken(token: string) {
      return this.jwt.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
      try {
        const request = context.switchToHttp().getRequest();
        const { authorization }: any = request.headers;
        console.log(authorization);
  
        if (!authorization || authorization.trim() === '') {
          throw new UnauthorizedException('Iltimos, tokenni taqdim eting.');
        }
        const authToken = authorization.replace(/bearer/gim, '').trim();
        const resp = await this.validateToken(authToken);
        console.log('ddd',resp);
        request.decodedData = resp;
        return true;
      } catch (error) {
        console.log('auth error - ', error.message);
        throw new ForbiddenException(
          error.message || 'sessiya muddati tugadi! Iltimos, tizimga kiring',
        );
      }
    }
  }