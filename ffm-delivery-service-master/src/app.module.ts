import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeliveryModule } from './deliveries/delivery.module';
import { DeliveryController } from './deliveries/delivery.controller';
import { DeliveryService } from './deliveries/delivery.service';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { HttpErrorFilter } from './shared/http.error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { ValidationPipe } from "./shared/validation.pipe";
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    MulterModule.register({
      dest: './files',
    }),DeliveryModule],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_FILTER,
    useClass: HttpErrorFilter
  },
  {
    provide:APP_INTERCEPTOR,
    useClass:LoggingInterceptor
  },
  {
    provide:APP_PIPE,
    useClass:ValidationPipe
  }]
})
export class AppModule {}
