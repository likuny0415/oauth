import { Injectable } from "@nestjs/common";
import { Todo } from "@prisma/client";
import dayjs from "dayjs";
import { PrismaService } from "src/prisma.service";


@Injectable()
export default class TodoService {
    constructor(
        private prisma: PrismaService
    ) {}

    async createTodo(request: Todo) {
        const { id, text, ddl, complete, priority, userId } = request
        const ddlToDate = dayjs(ddl).toDate()
       
        const todo = await this.prisma.todo.create({
            data: {
                id,
                text,
                ddl: ddlToDate,
                complete,
                priority,
                user: {
                    connect: { id: userId }
                }
            }
        })
    
       return todo
    }

    async findAll() {
        const todos = await this.prisma.todo.findMany();
        todos.map(todo => {
            todo.ddl = dayjs(todo.ddl).toDate()
        })
        return todos
    }

    async deleteTodo(todoId: string) {
        const deleteTodo = await this.prisma.todo.delete({
            where: {
                id: todoId
            }
        })
        return deleteTodo
    }

    async updateTodo(request: Todo) {
        const { id, text, ddl, complete, priority, userId } = request;
        const ddlToDate = dayjs(ddl).toDate()
        const updateTodo = await this.prisma.todo.update({
            where: {
                id
            },
            data: {
                text,
                ddl: ddlToDate,
                complete,
                priority,
            }
        })
        return updateTodo
    }
}