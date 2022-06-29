import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  app.setGlobalPrefix("api/v1")

  // important for front end to carry with credientials
  app.enableCors({
    origin: ["http://localhost:8000", "https://kuny-todo.herokuapp.com"],
    allowedHeaders: 'Cookies, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    
  })

  // app.enableCors()
  


  await app.listen(process.env.PORT || 8000);
}
bootstrap();
