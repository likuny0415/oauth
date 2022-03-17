import { Body, Injectable } from '@nestjs/common';
import { CreateUerDTO } from './dto/create-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {

    constructor(
        private readonly userRepository: UserRepository
    ) {}

   

    // async create(provider: string, thirdPartyId: string) {
    //     return this.userRepository.create(provider, thirdPartyId)
    // }

    async findOne(provider: string, thirdPartyId: string) {
        
        return await this.userRepository.findOne(provider, thirdPartyId);
    }

    async create(request: CreateUerDTO) {
        const createUser =  this.userRepository.create(request);
        return createUser;
    }

    async findAll() {
        return await this.userRepository.findAll();
    }

    // async test(googleId) {
    //     console.log(googleId)
    //     try {
    //         const user = await this.findOne(googleId);
    //         console.log(user);
    //         return "Find the user"
    //     } catch (error) {
    //         const newUser = await this.createUser(googleId, "google");
    //         console.log(newUser)
    //         return "create the user"
    //     }
    
    // }
}
