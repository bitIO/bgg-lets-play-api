import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle(`BGG Let's Play`)
    .setDescription('JSON style BGG API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    customCssUrl:
      'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-muted.css',
    customSiteTitle: `BGG - Let's Play API - Swagger`,
  });

  app.listen(process.env.PORT || 3333, '0.0.0.0');
}
bootstrap();
