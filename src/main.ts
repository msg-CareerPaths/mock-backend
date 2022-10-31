import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsersSwaggerTag } from './users/users.constants';
import { ProductsSwaggerTag } from './products/products.constants';
import { OrdersSwaggerTag } from './orders/orders.constants';
import { AuthSwaggerTag } from './auth/auth.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Online Shop API')
    .setDescription('The mock API for a basic Online Shop')
    .setVersion('1.0')
    .addTag(AuthSwaggerTag)
    .addTag(UsersSwaggerTag)
    .addTag(ProductsSwaggerTag)
    .addTag(OrdersSwaggerTag)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);

  await app.listen(port);
  Logger.log(
    `Application is running at http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
