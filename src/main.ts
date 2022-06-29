import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  app.setGlobalPrefix("api/v1")

  // important for front end to carry with credientials
  app.enableCors({
    origin: process.env.ORIGIN,
    credentials: true
    
  })

  // app.enableCors()
  


  await app.listen(process.env.PORT || 8000);
}
bootstrap();
