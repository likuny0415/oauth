import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const res = await this.authService.validateUser(username, password);
    if (!res) {
      throw new UnauthorizedException("Email or Password is nor correct");
    }
    
    const result = {...JSON.parse(JSON.stringify(res.user)), jwt: res.jwt}
    return result;
  }
}
