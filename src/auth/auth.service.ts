import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'jsonwebtoken';
import { User } from '@prisma/client';
require('dotenv').config();

@Injectable()
export class AuthService {

    private readonly JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
    ) {}

    
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

    async validateUser(email: string, password: string) {
        
        const user = await this.usersService.findUserByEmail(email);
        if (user) {
            const verified = await this.usersService.verifyUser(password, user.password)
            if (verified) {
                const { id } = user;
                const signinPayload = { id };
                const jwt: string = sign(signinPayload, this.JWT_SECRET_KEY, { expiresIn: '365d'});
                return { jwt, user};
            }
        }
        return null;
    }

    async login(user: User) {
        const { id } = user;
        return { token: this.jwtService.sign({ id }) };
    }

    async signup(user) {
        const { email, password } = user;
        try {
            const u = await this.usersService.createUser(email, password);
            const { id } = u;
            return { token: this.jwtService.sign({id}) }
        } catch (error) {
            throw new BadRequestException("Email in use")
        }
      
       


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


    

    async test(userProfile: any, provider: string) {
        const result = await this.validateOAuthLogin(userProfile, provider);
        
        return {...JSON.parse(JSON.stringify(result.user)), jwt: result.jwt};
    }


}
