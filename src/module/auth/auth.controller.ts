import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Post,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { loginDto, RefreshToken } from './dto';
  import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
//   import { Responses } from '../../entities/auth.entity';
  import { AuthGuard } from '../../common/guard/auth.guard';
  import { DecodedService } from '../auth/decoded/decoded.jwt';
  import { CheckEmail } from './dto/checkemail.dto';
import { CheckEmailResponceSW, CheckEmailSW, LoginResponse, LoginSW, UserResponse } from './swagger';
import { RefreshTokenResponse } from './swagger/response/refreshtokenResponse.sw';
import { UserForbiddenResponse, UserNotFoundResponse } from '../../common/service/errorResponse.swagger';

  // import { DecodedService } from './decoded/decoded.jwt';
  
  
  @ApiTags('auth')
  @Controller('auth')
  export class AuthController {
    DecodedService: any;
    constructor(
      private authService: AuthService,
      private decodedService: DecodedService,
    ) { }
  
    @Post('addadmin')
    addadmin() {
      return this.authService.addadmin();
    }
  

    /// signin func
    @ApiOperation({
      summary: 'foydalanuvchilarni login qilish',
      description: "malumotlar to'liq bo'lishi lozim",
    })
    @ApiBody({
      type: LoginSW,
      description: 'USer login structure',
    })
    @ApiResponse({
      type: LoginResponse,
      status: 200,
      description: 'All the users received successfully',
    })
    @ApiResponse({
        type: UserForbiddenResponse,
        status: 401,
        description: 'Unauthorized Access: Invalid credentials provided',
      })
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async singin(@Body() dto: loginDto) {
      return await this.authService.login(dto);
    }
  
  
  
    /// checked user
    @ApiOperation({
      summary: 'foydalanuvchilarni layout uchun tekshirish',
      description: "foydalanuvchi mavjud bo'lishi lozim",
    })
    @ApiResponse({
      type: UserResponse,
      status: 200,
      description: 'All the users checking email',
    })
    @ApiResponse({
        type: UserForbiddenResponse,
        status: 401,
        description: 'Unauthorized Access: Invalid credentials provided',
      })

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('/checkuser')
    async check_user(@Req() req: any) {
      const decodedToken = await this.decodedService.decoded(req);
  
      const one_user = this.authService.check_user(decodedToken.sub);
      return one_user;
    }
    // checked email
    @ApiOperation({
      summary: 'emailni tekshirish',
      description: "foydalanuvchi mavjud bo'lishi lozim",
    })
    @ApiBody({
      type: CheckEmailSW,
      description: 'Store product structure',
    })
    @ApiResponse({
      type: CheckEmailResponceSW,
      status: 200,
      description: 'All the users received',
    })
  
    @ApiResponse({
        type: UserNotFoundResponse,
        status: 404,
        description: 'HTTP status code representing the error (404 for resource not found)',
      })
    @Post('/checkemail')
    async check_email(@Body() email: CheckEmail) {
      // console.log(login);
      const user = await this.authService.check_login(email.email);
      if (!user) {
        throw new NotFoundException(`User with Email ${email.email} not found`);
      }
      return user;
    }


    @ApiOperation({
      summary: 'tokenni yangilash refreshtoken',
      description: "token mavjud bo'lishi lozim",
    })
    @ApiBody({
      type: RefreshToken,
      description: 'Store product structure',
    })
    @ApiResponse({
      type: RefreshTokenResponse,
      status: 200,
      description: 'All the users received',
    })
    @Post('/refreshtoken')
    async refreshtoken(@Body() accessToken: RefreshToken): Promise<object> {
      // console.log(accessToken);
      const token = await this.authService.refreshAccessToken(accessToken.accessToken);
      return token;
    }
  }