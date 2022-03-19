import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
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
  logout(@Req() req, @Res() res: Response) {
    res.cookie('accessToken', "", {
      httpOnly: true,
      maxAge: 0
    }).redirect("http://localhost:3000/")
  }

  @Get('/github')
  @UseGuards(AuthGuard('github'))
  githubAuth() {

  }

  @Get('/github/redirect')
  @UseGuards(AuthGuard('github'))
  githubAuthRedirect(@Req() req, @Res() res: Response) {
    console.log('this is the req.user::', req.user)
    const jwt: string = req.user.jwt;

    if (jwt) {
      res.cookie('accessToken', jwt, {
        httpOnly: true,
        // expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      res.redirect("http://localhost:3000/login")
    }

    // if (jwt) {
    //   res.redirect("https:/www.google.com")
    // }
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
