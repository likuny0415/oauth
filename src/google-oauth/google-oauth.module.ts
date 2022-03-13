import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { GoogleOauthController } from './google-oauth.controller';
import { GoogleOauthService } from './google-oauth.service';

@Module({
    imports: [UsersModule],
    controllers: [GoogleOauthController],
    providers: [GoogleOauthService,],

})

export class GoogleOauthModule {
    
}
