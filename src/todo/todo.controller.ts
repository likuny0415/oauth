import { Body, Controller, Get, Post } from '@nestjs/common';
import TodoService from './todo.service';

@Controller('todo')
export class TodoController {

    constructor(private todoService: TodoService) {}


    @Post('create')
    async create(@Body() request) {
        return this.todoService.createTodo(request);
    }

    @Get("findall")
    async findAll() {
        return this.todoService.findAll();
    }
}
