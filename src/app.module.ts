import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';


require('dotenv').config()
@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_CONNECTION,
    ),
    CatModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
