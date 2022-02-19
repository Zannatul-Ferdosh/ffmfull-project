import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const port = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });
  const options = new DocumentBuilder()
  .setTitle('Field Force User Management Service')
  .setDescription('User Management Service API description')
  .setVersion('1.0')
  .addTag('user')
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
    'access-token',
  )
  .build();
 const document = SwaggerModule.createDocument(app, options);
 SwaggerModule.setup('api/user-management', app, document);
  await app.listen(port);
}
bootstrap();
