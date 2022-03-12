import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { GoogleOauthController } from './google-oauth/google-oauth.controller';
import { GoogleOauthModule } from './google-oauth/google-oauth.module';
import { GoogleOauthService } from './google-oauth/google-oauth.service';
import { GoogleStrategy } from './google-oauth/google.strategy';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://kunyang:kunyang@cluster0.4rnvw.mongodb.net/oauth?retryWrites=true&w=majority',
    ),
    CatModule,
    GoogleOauthModule,
  ],
  controllers: [AppController, GoogleOauthController],
  providers: [AppService, GoogleOauthService, GoogleStrategy],
})
export class AppModule {}
