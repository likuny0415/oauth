import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly authService: AuthService
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["email", "profile"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const { id, displayName, name, emails, photos, provider } = profile;

      const user = {
        thirdPartyId: id,
        provider,
        email: emails[0].value,
        displayName,
        firstName: name.givenName,
        lastName: name.familyName,
        picture: photos[0].value,
        accessToken,
      };
      const oauthResponse = await this.authService.validateOAuthLogin(user, "google");
      
      done(null, {...JSON.parse(JSON.stringify(oauthResponse.user)), jwt: oauthResponse.jwt});
      // done(null, user)
    } catch (error) {
      console.log(error)
      done(error, false)
    }
  }
}
