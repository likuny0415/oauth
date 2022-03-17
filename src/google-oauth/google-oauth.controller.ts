import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GoogleOauthService } from "./google-oauth.service";

@Controller("google")
export class GoogleOauthController {
  constructor(private readonly googleService: GoogleOauthService) {}

  @Get()
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req) {
    // should'n add anything
  }

  @Get("redirect")
  @UseGuards(AuthGuard("google"))
  googleAuthRedirect(@Req() req) {
    return this.googleService.googleLogin(req);
  }

  @Get("xx")
  async xx() {
    return {
      text: 213213123123,
      please: "wrik",
    };
  }
}
