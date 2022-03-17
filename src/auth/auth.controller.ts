import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService
    ) {
  }

   @Post('/signup')
    async signup(@Body() body) {
      return this.authService.signup(body.provider, body.thirdPartyId);
    }

    @Post('/signin')
    async signin(@Body() body) {
      return this.authService.signin(body.provider, body.thirdPartyId);
    }
}
