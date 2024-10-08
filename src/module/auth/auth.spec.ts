import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DecodedService } from '../auth/decoded/decoded.jwt';
import { loginDto, RefreshToken } from './dto';
import { CheckEmail } from './dto/checkemail.dto';
import { NotFoundException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let decodedService: DecodedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [
            JwtModule.register({
              secret: process.env.JWT_SECRET, // o'zingizga kerakli maxfiy kalit
              signOptions: { expiresIn: '60s' }, // vaqtni sozlang
            }),
          ],
      controllers: [AuthController],
      providers: [
        {
            
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            check_user: jest.fn(),
            check_login: jest.fn(),
            refreshAccessToken: jest.fn(),
          },
        },
        {
          provide: DecodedService,
          useValue: {
            decoded: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    decodedService = module.get<DecodedService>(DecodedService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a login response', async () => {
      const dto: loginDto = { email: 'test@test.com', password: '123456' };
      const mockLoginResponse = { accessToken: 'token', user: { id: "1", email: 'test@test.com' } };
      jest.spyOn(authService, 'login').mockResolvedValue(mockLoginResponse);

      const result = await controller.singin(dto);
      expect(result).toEqual(mockLoginResponse);
      expect(authService.login).toHaveBeenCalledWith(dto);
    });
  });

  describe('check_user', () => {
    it('should return a user if found', async () => {
      const req = { headers: { authorization: 'Bearer token' } };
      const decodedToken = { sub: '1' };
      const mockUser = { id: "1", email: 'test@test.com' };

      jest.spyOn(decodedService, 'decoded').mockResolvedValue(decodedToken);
      jest.spyOn(authService, 'check_user').mockResolvedValue(mockUser);

      const result = await controller.check_user(req);
      expect(result).toEqual(mockUser);
      expect(decodedService.decoded).toHaveBeenCalledWith(req);
      expect(authService.check_user).toHaveBeenCalledWith(decodedToken.sub);
    });
  });

  describe('check_email', () => {
    it('should return a user by email', async () => {
      const emailDto: CheckEmail = { email: 'test@test.com' };
      const mockUser = { exist: true }; 

      jest.spyOn(authService, 'check_login').mockResolvedValue(mockUser);

      const result = await controller.check_email(emailDto);
      expect(result).toEqual(mockUser);
      expect(authService.check_login).toHaveBeenCalledWith(emailDto.email);
    });

    it('should throw a NotFoundException if user not found', async () => {
      const emailDto: CheckEmail = { email: 'test@test.com' };
      jest.spyOn(authService, 'check_login').mockResolvedValue(null);

      await expect(controller.check_email(emailDto)).rejects.toThrow(NotFoundException);
      expect(authService.check_login).toHaveBeenCalledWith(emailDto.email);
    });
  });

  describe('refreshtoken', () => {
    it('should return a new access token', async () => {
      const refreshTokenDto: RefreshToken = { accessToken: 'oldToken' };
      const mockTokenResponse = { newAccessToken: 'newToken' };

      jest.spyOn(authService, 'refreshAccessToken').mockResolvedValue(mockTokenResponse);

      const result = await controller.refreshtoken(refreshTokenDto);
      expect(result).toEqual(mockTokenResponse);
      expect(authService.refreshAccessToken).toHaveBeenCalledWith(refreshTokenDto.accessToken);
    });
  });
});
