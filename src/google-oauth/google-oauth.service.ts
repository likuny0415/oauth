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
        
        try {
            const user = this.userService.findUser(googleId);
            return {
                "message": "User is login",
            }
        } catch (error) {
            this.userService.createUser({authType:"google", googleId:googleId})
            return {
                message: 'This user have been created',
                user: req.user
            }
        }
    }
}
