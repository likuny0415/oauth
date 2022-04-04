import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  app.setGlobalPrefix("api/v1")
  app.enableCors()
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
