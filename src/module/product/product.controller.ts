import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { DecodedService } from '../auth/decoded/decoded.jwt';
import { ProductService } from './product.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllProductResponse, createProduct, DeleteProductResponse, OneProductResponse, QueryDes } from './swagger';
import { AuthGuard } from '../../common/guard/auth.guard';
import { createProductDto, getDto } from './dto';
import { Request } from 'express';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UserForbiddenResponse } from '../../common/service/errorResponse.swagger';
const UPLOAD_DIR = './files/product';
@ApiTags('product')

@Controller('products')
export class ProductController {
    constructor(
        private Productservice: ProductService,


    ) { }

    /// get all Product
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'barcha Product filterlash uchun',
        description: 'barcha Product filtirlab olish',
    })
    @ApiQuery({
        type: QueryDes,
        description: 'Store product structure',
    })
    @ApiResponse({
        type: AllProductResponse,
        status: 200,
        description: 'barcha mahsulot responce malumoti',
      })
    @UseGuards(AuthGuard)
    @Get('all')
    async all(@Query() query: any) {
        const Products = await this.Productservice.all(query);
        return Products;
    }

    /// create product
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'foydalanuvchini yaratish',
        description: 'foydalanuvchini yaratish',
    })
    @ApiBody({
        type: createProduct,
        description: 'Store product structure',
    })
    @ApiResponse({
        type: OneProductResponse,
        status: 200,
        description: 'bitta foydalanuvchi responce malumoti',
      })
      @ApiResponse({
        type: UserForbiddenResponse,
        status: 401,
        description: 'Unauthorized Access: Invalid credentials provided',
      })
      
    @UseGuards(AuthGuard)
    @Post('/create')
    async create(@Body() dto: createProductDto) {
        // const decodedToken = await this.decodedService.decoded(req);

        const Product = await this.Productservice.create(dto);
        return Product;
    }

    /// Product update
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Product malumotlarini o`zgartirish',
        description: 'Product malumotlarini yaratish',
    })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'userni IDsi',
    })
    @ApiBody({
        type: createProduct,
        description: 'Store product structure',
    })
    @ApiResponse({
        type: OneProductResponse,
        status: 200,
        description: 'bitta mahsulot responce malumoti',
      })
    @UseGuards(AuthGuard)
    @Put('/update/:id')
    async update(@Body() dto: createProductDto,@Param() params: getDto ) {
        const product = await this.Productservice.update(dto, params);
        return product;
    }

    // Product get one
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Productni bitta malumotini olish',
        description: 'Productni malumotlarini olish',
    })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'Productni IDsi',
    })
    @ApiResponse({
        type: OneProductResponse,
        status: 200,
        description: 'bitta mahsulot responce malumoti',
      })
    @UseGuards(AuthGuard)
    @Get('/:id')
    async getOne(@Param() params: getDto) {

        const product = await this.Productservice.getOne(params.id);
        return product;
    }



    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Productni bitta malumotini uchirish',
        description: 'Productni malumotlarini uchirish',
    })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'Productni IDsi',
    })
    @ApiResponse({
        type: DeleteProductResponse,
        status: 200,
        description: 'bitta mahsulot responce malumoti',
      })
    @UseGuards(AuthGuard)

@Delete('/:id')
async delete(@Param() params: getDto){
    const product = await this.Productservice.delete(params.id);
    return product;
}
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: UPLOAD_DIR,
                filename: (
                    req: Request, // Specify the type of req parameter
                    file,
                    cb,
                ) => {
                    const uid = Date.now();

                    cb(null, `${uid}${file.originalname}`);
                },
            }),
        }),
    )
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'bitta Productni image yuklash',
        description: 'majburlovchi maydonlar to`ldirilishi lozim',
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseGuards(AuthGuard)
    @Post('upload')
    @ApiConsumes('multipart/form-data')
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return { file: file.path };
        // Handle file upload logic here
    }
}

