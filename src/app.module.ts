import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './module/product/product.module';
import { DecodedService } from './module/auth/decoded/decoded.jwt';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: 'src/config/.env',
    isGlobal: true,
  }),
  MongooseModule.forRoot(process.env.DB_URI, {
    autoIndex: true, // Indekslarni avtomatik yaratish yoqilgan
  }), AuthModule,UserModule, ProductModule],
  controllers: [AppController],
  providers: [AppService,DecodedService],
})
export class AppModule {}
