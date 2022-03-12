import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { GoogleOauthController } from './google-oauth/google-oauth.controller';
import { GoogleOauthModule } from './google-oauth/google-oauth.module';
import { GoogleOauthService } from './google-oauth/google-oauth.service';
import { GoogleStrategy } from './google-oauth/google.strategy';
require('dotenv').config()
@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_CONNECTION,
    ),
    CatModule,
    GoogleOauthModule,
  ],
  controllers: [AppController, GoogleOauthController],
  providers: [AppService, GoogleOauthService, GoogleStrategy],
})
export class AppModule {}
