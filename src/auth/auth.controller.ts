import { Body, Controller, Get, Post, Req, Res, Request, UseGuards } from '@nestjs/common';
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
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
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
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      
      res.redirect("http://localhost:3000/login")
    }

    // if (jwt) {
    //   res.redirect("https:/www.google.com")
    // }
  }

  @Post('login')
  login(@Body() body) {
    // return this.authService.login(body);
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

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async whoami(@Req() req) {
    console.log(req)
    return req.user
  }

}
