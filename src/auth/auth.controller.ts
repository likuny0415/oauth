import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
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

  @Get('/logout')
  logout(@Req() req, @Res() res) {
    req.logout()
    res.redirect('/')
  }

  @Get('/github')
  @UseGuards(AuthGuard('github'))
  githubAuth(@Req() req) {}

  @Get('/github/redirect')
  @UseGuards(AuthGuard('github'))
  githubAuthRedirect(@Req() req, @Res() res) {
    return "hello"
  }

  @Get("/google")
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req) {

  }

  
  @Get("/google/redirect")
  @UseGuards(AuthGuard("google"))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req)
  }

  @Post('test')
  async test(@Body() body: CreateUerDTO) {
    return this.authService.test(body, body.provider);
  }

}
