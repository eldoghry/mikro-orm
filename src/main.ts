import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MikroORM } from '@mikro-orm/core';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const mikroOrm = app.get(MikroORM);
  mikroOrm.getMigrator().up(); // auto migrate new migration

  await app.listen(3000);
}
bootstrap();
