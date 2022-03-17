import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class GoogleOauthService {

    constructor(private userService: UsersService) {}
    
    googleLogin(req) {
        if (!req.user) {
            return "NO user found"
        }
    
        return {
            message: 'This user have been created',
            user: req.user
        }
    }
}
