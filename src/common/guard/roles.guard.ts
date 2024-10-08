import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly jwt: JwtService) {}

  async validateToken(token: string) {
    try {
      return await this.jwt.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('role', [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('Required Roles:', requiredRoles);

    if (!requiredRoles) {
      return true; // Agar rol belgilanmagan bo'lsa, ruxsat beriladi
    }

    const request = context.switchToHttp().getRequest();
    const { authorization }: any = request.headers;

    if (!authorization) {
      throw new HttpException('Authorization header missing', HttpStatus.FORBIDDEN);
    }

    const authToken = authorization.replace(/bearer/i, '').trim();

    if (!authToken) {
      throw new HttpException('Token missing or malformed', HttpStatus.UNAUTHORIZED);
    }

    const decodedToken = await this.validateToken(authToken);

    console.log('Decoded Token:', decodedToken);

    const hasRole = requiredRoles.some((role) => role === decodedToken.role);

    if (!hasRole) {
      throw new HttpException('User does not have the required role', HttpStatus.FORBIDDEN);
    }

    return true; // Ruxsat berildi
  }
}
