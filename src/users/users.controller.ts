import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService
    ) {}

    // @Post("create")
    // async createUser(@Body() request: CreateUerDTO) {
    //     return this.userService.create(request.provider, request.thirdPartyId);
    // }

    @Post("findOne")
    async findUser(@Body() request: User) {
        return this.userService.findOne(request.provider, request.thirdPartyId);
    }

    @Post("findAll")
    async findAll() {
        return this.userService.findAll();
    }

    @Post("create")
    async create(@Body() userData) {
        return this.userService.create(userData);
    }

  

}
