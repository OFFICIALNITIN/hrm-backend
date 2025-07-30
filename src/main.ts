import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  // Security
  app.use(helmet());
  app.enableCors({
    origin: configService.getOrThrow<string>('FRONTEND_URL'),
    methods: 'GET,POST, PATCH, DELETE',
    credentials: true,
  });
  app.use(helmet());
  app.use(cookieParser());

  // Validation pipe configuration
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // API Versioning
  app.setGlobalPrefix('api/v1');

  // Swagger API documentation
  const config = new DocumentBuilder()
    .setTitle('HRM System API')
    .setDescription(
      'The API documentation for Human Resource Management System',
    )
    .setVersion('1.0')
    .addBasicAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = configService.get<string>('PORT') || 3000;
  await app.listen(port);
  logger.log(`Applicatipon is running on ${await app.getUrl()}`);
}
bootstrap();
