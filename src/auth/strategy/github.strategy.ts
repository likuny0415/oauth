import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-github2";
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
      scope: [],
      Proxy: true,
    })
  }

  // http://localhost:3000/api/v1/auth/github
  async validate(accessToken: string, refreshToken: string, profile: any) {
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
        const { id } = profile
          return id;
      } catch (error) {
          console.log(error)
      }
  }
}
