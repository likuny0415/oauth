import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUerDTO } from './dto/create-user.dto';
import { User } from './users.schema';
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
    async findUser(@Body() request: CreateUerDTO) {
        return this.userService.findOne(request.provider, request.thirdPartyId);
    }


    @Post("create")
    async createUser(@Body() request: CreateUerDTO) {
        return this.userService.create(request);
    }

    @Post('findUserId')
    async findUserId(@Body() request: CreateUerDTO) {
        return this.userService.findUserId(request.provider, request.thirdPartyId)
    }

}
