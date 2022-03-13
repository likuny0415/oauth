import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUerDTO } from './dto/create-user.dto';
import { User } from './users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService
    ) {}

    @Post("create")
    async createUser(@Body() user: CreateUerDTO) {
        return this.userService.createUser(user);
    }

    @Post("find")
    async findUser(@Body() request) {
        console.log(request)
        console.log("Above is request")
        return this.userService.findUser(request);
    }

    @Post("findall")
    async findAll() {
        return this.userService.findAll();
    }
}
