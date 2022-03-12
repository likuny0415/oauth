import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleOauthService {
    googleLogin(req) {
        if (!req.user) {
            return "NO user found"
        }

        return {
            message: 'User from google',
            user: req.user
        }
    }
}
