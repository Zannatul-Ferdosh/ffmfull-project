import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true,logger: ['error', 'warn'] },);
  const options = new DocumentBuilder()
  .setTitle('Field Force Attendance Service')
  .setDescription("This is a digital platform, owned by The **[Tech Serve4 U, LLC](http://techserve4u.com)** <br />**Disclaimer:** You are not allowed to distribute, share, or sell this platform, services, and any contents to anyone for selling or public usages.<br/>**Contact for more details:** <info@techserve4u.com> <br />**Phone:** +1 (586) 834-8526")
  .setVersion('1.0')
  .addTag('attendance')
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
    'access-token',
  )
  .build();
 const document = SwaggerModule.createDocument(app, options);
 SwaggerModule.setup('api/attendance', app, document);
  await app.listen(3000);

 
}
bootstrap();
