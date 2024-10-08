import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthGuard } from '../../common/guard/auth.guard';
import { RolesGuard } from '../../common/guard/roles.guard';
import { createUserDto, updateUserDto } from './dto';
import { NotFoundException } from '@nestjs/common';
import { UserRole } from './enums/role.enum';
import { DecodedService } from '../auth/decoded/decoded.jwt';
describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  const mockDecodedService = {
    decoded: jest.fn(() => {
      return { userId: 'testId' };
    }),
  };
  const mockUserService = {
    all: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    getOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService, // UserService'ni mock qilish
        },
        {
            provide: DecodedService,
            useValue: mockDecodedService, // Mock DecodedService
          },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true }) // AuthGuard mock
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true }) // RolesGuard mock
      .compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get all users', () => {
    it('should return an array of users', async () => {
      const result = {
        data: [{ id: 1, name: 'Test User' }],
        pagination: { page: 1, limit: 10, total: 1 },
      };
      mockUserService.all.mockResolvedValue(result); // Mock result

      expect(await controller.all({})).toEqual(result);
      expect(mockUserService.all).toHaveBeenCalled();
    });
  });

  describe('create user', () => {
    it('should create a user', async () => {
      const dto: createUserDto = { username: 'New User', email: 'test@test.com', password: '123456', role:UserRole.User };
      const result = { id: 1, ...dto };
      mockUserService.create.mockResolvedValue(result); // Mock result

      expect(await controller.create(dto, {} as any)).toEqual(result);
      expect(mockUserService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update user', () => {
    it('should update a user', async () => {
      const dto: updateUserDto = { username: 'Updated User' ,role:UserRole.User };
      const params = { id: '1' };
      const result = { id: '1', ...dto };
      mockUserService.update.mockResolvedValue(result); // Mock result

      expect(await controller.update(dto, params)).toEqual(result);
      expect(mockUserService.update).toHaveBeenCalledWith(dto, params);
    });
  });

  describe('get one user', () => {
    it('should return a user', async () => {
      const result = { id: '1', username: 'Test User' };
      mockUserService.getOne.mockResolvedValue(result); // Mock result

      expect(await controller.getOne({ id: '1' })).toEqual(result);
      expect(mockUserService.getOne).toHaveBeenCalledWith('1');
    });

    it('should throw a NotFoundException if user not found', async () => {
      mockUserService.getOne.mockResolvedValue(null); // Mock null result

      await expect(controller.getOne({ id: '1' })).rejects.toThrow(NotFoundException);
      expect(mockUserService.getOne).toHaveBeenCalledWith('1');
    });
  });
});
