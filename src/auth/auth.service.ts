import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService
    ) {}

    async signup(provider: string, thirdPartyId: string) {
        const user = await this.usersService.findOne(provider, thirdPartyId);
        if (user) {
            throw new BadRequestException("User account has been created");
        }

        const newUser = await this.usersService.create(provider, thirdPartyId);
        return newUser;
    }

    async signin(provider: string, thirdPartyId: string) {
        const user = await this.usersService.findOne(provider, thirdPartyId);
        if (!user) {
            throw new NotFoundException("Not found user")
        }

        return user;
    }

    googleLogin(req) {
        if (!req.user) {
            return "No user found"
        }
        return {
            message: "This is the current user",
            user: req.user
        }
    }


}
