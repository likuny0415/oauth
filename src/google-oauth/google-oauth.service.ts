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
            this.userService.createUser({authType:"google", googleId:googleId})
            return {
                message: 'This user have been created',
                user: req.user
            }
        } else {
            this.userService.createUser({authType:"google", googleId:googleId})
            return {
                message: 'This user have been created',
                user: req.user
            }
        }
    }
}
