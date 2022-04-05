import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'jsonwebtoken';
require('dotenv').config();

@Injectable()
export class AuthService {

    private readonly JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signup(provider: string, thirdPartyId: string) {
        const user = await this.usersService.findOne(provider, thirdPartyId);
        if (user) {
            throw new BadRequestException("User account has been created");
        }

        // // const newUser = await this.usersService.create(provider, thirdPartyId);
        // return newUser;
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


    async validateOAuthLogin(userProfile: any, provider: string) {
        
        try {
            let existingUser = await this.usersService.findOne(provider, userProfile.thirdPartyId);
            if (!existingUser) {
                existingUser = await this.usersService.signup(userProfile);
            }
        
            const { id } = existingUser
            const signinPayload = { id };
            const jwt: string = sign(signinPayload, this.JWT_SECRET_KEY, { expiresIn: '365d' });
            return { jwt, user: existingUser}

        } catch (error) {
            throw new InternalServerErrorException('validateOAuthLogin', error.message);
        }
    }

    async test(userProfile: any, provider: string) {
        const result = await this.validateOAuthLogin(userProfile, provider);
        
        return {...JSON.parse(JSON.stringify(result.user)), jwt: result.jwt};
    }


}
