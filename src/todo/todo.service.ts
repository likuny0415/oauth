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
        console.log(userId)
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

    async finishTodo(id: string) {
        const todo = await this.prisma.todo.update({
            where: {
                id: id
            },
            data: {
                complete: 2
            }
        })
        return todo
    }

    async findAll(userId: string) {
        const todos = await this.prisma.todo.findMany({
            orderBy: [
                {
                    priority: "desc"
                },
                {
                    ddl: 'asc'
                }
            ],
            where: {
                complete: 1,
                userId
            }

        });
        
        todos.map(todo => {
            todo.ddl = dayjs(todo.ddl).toDate()
        })
        return todos
    }

    async deleteTodo(todoId: string) {
        const deleteTodo = await this.prisma.todo.update({
            where: {
                id: todoId
            },
            data: {
                complete: 3
            }
        })
        return deleteTodo
    }

    async updateTodo(request: Todo) {
        const { id, text, ddl, priority } = request;
        const ddlToDate = dayjs(ddl).toDate()
        const updateTodo = await this.prisma.todo.update({
            where: {
                id
            },
            data: {
                text,
                ddl: ddlToDate,
                priority,
            }
        })
        return updateTodo
    }
}