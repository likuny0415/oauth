import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class GoogleOauthService {

    constructor(private userService: UsersService) {}
    
    googleLogin(req) {
        if (!req.user) {
            return "NO user found"
        }
        
        const googleId = req.user.id
        const user = this.userService.findUser(googleId);
        if (user) {
            return "This user exists";
        } else {
            this.userService.createUser({authType:"google", googleId:googleId})
            return "This user have been created"
        }
        


        return {
            message: 'User from google',
            user: req.user
        }
    }
}
