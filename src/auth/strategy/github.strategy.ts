import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { VerifiedCallback } from 'passport-jwt';
import { AuthService } from '../auth.service';




@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      passReqToCallback: true,
      scope: ['user:email'],
    });
  }

  async validate(req: any, accessToken: string, refreshToken: string, profile: any, done: VerifiedCallback) {
    try {
      Logger.log(`GitHub UserProfile`, 'Auth');
      const jsonProfile = profile && profile._json || {};
    
      const userProfile = {
        thirdPartyId: profile.id || jsonProfile.id,
        provider: profile.provider,
        displayName: profile.username,
        username: profile.login || jsonProfile.login,
        email: profile.email || Array.isArray(profile.emails) && profile.emails[0].value,
        picture: `${jsonProfile.avatar_url}&size=200`,
        accessToken
      };
      
      const oauthResponse = await this.authService.validateOAuthLogin(userProfile, 'github');
      const result = {...JSON.parse(JSON.stringify(oauthResponse.user)), jwt: oauthResponse.jwt}
      done(null,  result);
    } catch (err) {
      done(err, false)
    }
  }
}
