import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

require("dotenv").config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL:  process.env.GOOGLE_CALLBACK_URL,
      scope: ["email", "profile"],
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        
      } catch (error) {
        
      }
    });
  }
  
  
  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
      const { id, name, emails, photos } = profile;
      const user = {
        id: id,
        email: emails[0].value,
        firstName: name.givenName,
        lastName: name.familyName,
        picture: photos[0].value,
        accessToken
      }
      done(null, profile);


  }
}
