import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUerDTO } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService
    ) {
  }

  //  @Post('/signup')
  //   async signup(@Body() body) {
  //     return this.authService.signup(body.provider, body.thirdPartyId);
  //   }

  //   @Post('/signin')
  //   async signin(@Body() body) {
  //     return this.authService.signin(body.provider, body.thirdPartyId);
  //   }

  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req) {

  }

  @Post('test')
  async test(@Body() body: CreateUerDTO) {
    return this.authService.validateOAuthLogin(body, "google");
  }

  
  @Get("/google/redirect")
  @UseGuards(AuthGuard("google"))
  googleAuthRedirect(@Req() req) {
    return req;
  }

}
