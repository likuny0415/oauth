import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Todo } from '@prisma/client';
import { DeleteTodo, FinishTodo } from './dto/FinishTodo.dto';
import TodoService from './todo.service';

@Controller('todo')
@UseGuards(AuthGuard('jwt'))
export class TodoController {

    constructor(private todoService: TodoService) {}


    @Post('create')
    async create(@Body() request: Todo) {
        // const { userId } = req.user
        const { id, text, ddl, complete, priority, userId } = request
        
        request.userId = "885c7b57-0cc1-4cc6-b917-8a908bdc8b55"
        const r= await this.todoService.createTodo(request);
        return {
            code: 200,
            msg: "success",
            r
        };
    }

    @Post('finish')
    async finish(@Body() request: FinishTodo) { 
        const { id } = request
        const r = await this.todoService.finishTodo(id);
        return {
            code: 200,
            msg: "success",
            r
        }
    }

    @Get("findall")
    async findAll() {
        const r = await this.todoService.findAll();
        return {
            code: 200,
            msg: "success",
            r
        }
    }
    
    @Post('delete')
    async delete(@Body() request: DeleteTodo) {
        const r = await this.todoService.deleteTodo(request.id)
        return {
            code: 200,
            msg: "success",
            r
        };
    }

    @Post('update')
    async update(@Body() request: Todo) {
        const r = await this.todoService.updateTodo(request);
        return {
            code:200,
            msg: "success",
            r
        }
    }
}
