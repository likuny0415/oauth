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

  @Post('login')
  @UseGuards(AuthGuard("local"))
  async login(@Req() req, @Res() res: Response) {
    const jwt: string = req.user.jwt;

    if (jwt) {
      res.cookie('accessToken', jwt, {
        path: "/",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 365,
      }).redirect("http://localhost:3000")
    } else {
      res.redirect("http://localhost:3000/login")
    }
  }

  @Post('signup')
  async signup(@Body() signupUser) {
    return await this.authService.signup(signupUser)
  }
 
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
    
    const jwt: string = req.user.jwt;

    if (jwt) {
      res.cookie('accessToken', jwt, {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 365
      }).redirect("http://localhost:3000/");
    }
    else {
      res.redirect("http://localhost:3000/login")
    }
  }

  @Get("/google")
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req) {

  }

  
  @Get("/google/redirect")
  @UseGuards(AuthGuard("google"))
  googleAuthRedirect(@Req() req, @Res() res: Response) {
    const jwt: string = req.user.jwt;

    if (jwt) {
      res.cookie('accessToken', jwt, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60
      })
      
      res.redirect("http://localhost:3000/login")
    }
  }

  @Post('test')
  async test(@Body() body: CreateUerDTO) {
    return this.authService.test(body, body.provider);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async whoami(@Req() req) {
    
    if (req.user) {
      return req.user
    } else {
      return {
        code: 200,
        msg: "success"
      }
    }
  }

}
