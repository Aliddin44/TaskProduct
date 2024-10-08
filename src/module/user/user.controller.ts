import { Body, Controller, Get, NotFoundException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { DecodedService } from '../auth/decoded/decoded.jwt';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllUserResponse, createUser, OneUserResponse, QueryDes } from './swagger';
import { AuthGuard } from '../../common/guard/auth.guard';
import { createUserDto, getDto, updateUserDto,QueryFil } from './dto';

import { Request } from 'express';
import { RolesGuard } from '../../common/guard/roles.guard';
import { Roles } from '../../common/decorator/role.dc';
import { UserForbiddenResponse } from '../../common/service/errorResponse.swagger';
import { pagination } from '../../common/dto/pagination.dto';



@ApiTags('user')

@Controller('users')
export class UserController {
    constructor(
        private userservice: UserService,
        private decodedService: DecodedService,


    ) { }

    /// get all user
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'barcha user filterlash uchun',
        description: 'barcha user filtirlab olish',
    })
    @ApiQuery({
        type: QueryDes,
        description: 'Store product structure',
    })
    @ApiResponse({
        type: AllUserResponse,
        status: 200,
        description: 'barcha foydalanuvchi responce malumoti',
      })
      @ApiResponse({
        type: UserForbiddenResponse,
        status: 401,
        description: 'Unauthorized Access: Invalid credentials provided',
      })

     
    @UseGuards(AuthGuard,RolesGuard)
    @Roles('admin')
    @Get('all')
    
    async all(@Query() query:QueryFil):Promise<{data:createUserDto[], pagination: pagination}> {
        const users = await this.userservice.all(query);

        return users;
    }

    /// create user
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'foydalanuvchini yaratish',
        description: 'foydalanuvchini yaratish',
    })
    @ApiBody({
        type: createUser,
        description: 'Store product structure',
    })
 
    @ApiResponse({
        type: OneUserResponse,
        status: 200,
        description: 'bitta foydalanuvchi responce malumoti',
      })
      @ApiResponse({
        type: UserForbiddenResponse,
        status: 401,
        description: 'Unauthorized Access: Invalid credentials provided',
      })

    @UseGuards(AuthGuard,RolesGuard)
    @Roles('admin')
    @Post('/create')
    async create(@Body() dto: createUserDto, req: Request) {
        // const decodedToken = await this.decodedService.decoded(req);

        const user = await this.userservice.create(dto);
        return user;
    }

    /// user update
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'user malumotlarini o`zgartirish',
        description: 'user malumotlarini o`zgartirish',
    })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'userni IDsi',
    })
    @ApiBody({
        type: createUser,
        description: 'Store product structure',
    })
    @ApiResponse({
        type: OneUserResponse,
        status: 200,
        description: 'bitta foydalanuvchi responce malumoti',
      })
      @ApiResponse({
        type: UserForbiddenResponse,
        status: 401,
        description: 'Unauthorized Access: Invalid credentials provided',
      })

    @UseGuards(AuthGuard,RolesGuard)
    @Roles('admin')
    @Put('/update/:id')
    async update(@Body() dto: updateUserDto,@Param() params: getDto ) {
        const user = await this.userservice.update(dto,params);
        return user;
    }

    // user get one
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'userni bitta malumotini olish',
        description: 'userni malumotlarini olish',
    })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'userni IDsi',
    })
    @ApiResponse({
        type: OneUserResponse,
        status: 200,
        description: 'bitta foydalanuvchi responce malumoti',
      })
      @ApiResponse({
        type: UserForbiddenResponse,
        status: 401,
        description: 'Unauthorized Access: Invalid credentials provided',
      })

    @UseGuards(AuthGuard,RolesGuard)
    @Roles('admin')
    @Get('/:id')
    async getOne(@Param() params: getDto) {

        const user = await this.userservice.getOne(params.id);
        if (!user) {
            throw new NotFoundException(`User with ID ${params.id} not found`);
          }
        return user;
    }


 
}
