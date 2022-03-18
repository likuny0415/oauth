import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-github2";
import { VerifiedCallback } from "passport-jwt";
import { AuthService } from "../auth.service";
require("dotenv").config();

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, "github") {
  constructor(
      private readonly authService: AuthService
  ) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      passReqToCallback: true,
      scope: ["user:email"],
    });
  }

  async validate(req:any, accessToken: string, refreshToken: string, profile: any, done: VerifiedCallback) {
      try {
        //   const jsonProfile = profile && profile._json
        //   console.log(profile)
        // const user = {
        //     thirdPartyId: profile.id || jsonProfile.id,
        //     provider: "github",
        //     email: profile.email || jsonProfile.email,    
        //     displayName: profile.displayName || jsonProfile.displayName,
        //     picture: `${jsonProfile.avatar_url}&size=200`,
        //     accessToken,
        //   };
        //   console.log('userProfile::', user, ' - req::', req.headers)
        //   const oauthResponse = await this.authService.validateOAuthLogin(user, "github");
        //   const result = {...JSON.parse(JSON.stringify(oauthResponse.user)), jwt: oauthResponse.jwt}
          done(null,  profile);
      } catch (error) {
          done(error, false)
      }
  }
}
