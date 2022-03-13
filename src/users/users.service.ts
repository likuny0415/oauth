import { Body, Injectable } from '@nestjs/common';
import { CreateUerDTO } from './dto/create-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {

    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async createUser(user: CreateUerDTO) {
        if (user.authType == "google") {
            return await this.userRepository.createUser(user.googleId, user.authType);
        }
        if (user.authType == "facebook") {
            return await this.userRepository.createUser(user.facebookId, user.authType);
        }
        return "Must be sign in with google and facebook"
    }

    async findUser(request) {
        
        return await this.userRepository.findUser(request.googleId);
    }

    async findAll() {
        return await this.userRepository.findAll();
    }
}
