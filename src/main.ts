import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { QueryFailedErrorFilter } from './filters/query-failed-error.filter';

async function bootstrap() {
  // original code
  // const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe())

  //new code
  const app = await NestFactory.create(AppModule);
  
  // use validation
  app.useGlobalPipes(new ValidationPipe())
  
  // register filter
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new QueryFailedErrorFilter(httpAdapter))
  //

  await app.listen(3000);
}
bootstrap();
