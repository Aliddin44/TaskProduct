import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { createProductDto } from './dto';
import { JwtModule } from '@nestjs/jwt';
import { OneProductResponse } from './swagger';

const mockProduct = {
  product_name: 'Test Product',
  product_price: 100,
  product_description: 'Test Description',
  product_image: 'Test path',
};

const mockProductService = {
  create: jest.fn().mockResolvedValue(mockProduct),
  all: jest.fn().mockResolvedValue([mockProduct]),
  getOne: jest.fn().mockResolvedValue(mockProduct),
  update: jest.fn().mockResolvedValue(mockProduct),
  delete: jest.fn().mockResolvedValue(mockProduct),
};

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [
            JwtModule.register({
              secret: process.env.JWT_SECRET, // o'zingizga kerakli maxfiy kalit
              signOptions: { expiresIn: '60s' }, // vaqtni sozlang
            }),
          ],
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', async () => {
    
    const product = await controller.create(mockProduct);
    expect(product).toEqual(mockProduct);
    expect(mockProductService.create).toHaveBeenCalledWith(mockProduct);
  });

  it('should return all products', async () => {
    const products = await controller.all({});
    expect(products).toEqual([mockProduct]);
    expect(mockProductService.all).toHaveBeenCalled();
  });

  it('should return a product by id', async () => {
    const product = await controller.getOne({ id: '1' });
    expect(product).toEqual(mockProduct);
    expect(mockProductService.getOne).toHaveBeenCalledWith('1');
  });

  it('should update a product', async () => {
    const mockProduct = {
        id: '1',
        product_name: 'Test Product',
        product_price: 100,
        product_description: 'Test Description',
        product_image: 'Test path',
    };

    jest.spyOn(mockProductService, 'update').mockResolvedValue(mockProduct);

    const result = await controller.update(mockProduct, { id: '1' });
    expect(result).toEqual(mockProduct);
    expect(mockProductService.update).toHaveBeenCalledWith(mockProduct, { id: '1' });
  });

  it('should delete a product', async () => {
    jest.spyOn(mockProductService, 'delete').mockResolvedValue({ message: 'deleted' });
    const product = await controller.delete({ id: '1' });
    expect(product).toEqual({message:'deleted'});
    expect(mockProductService.delete).toHaveBeenCalledWith('1');
  });
});
