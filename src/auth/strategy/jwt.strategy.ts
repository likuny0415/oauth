import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
require('dotenv').config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            // so important
            jwtFromRequest: (req) => {
                if (!req || !req.cookies) {
                    return null;
                }
                
                return req.cookies['accessToken']
            },
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY
        })
    }

    async validate(payload: any) {
        return { userId: payload.id }
    }
}

