import { Injectable } from "@nestjs/common";
import dayjs from "dayjs";
import { PrismaService } from "src/prisma.service";


@Injectable()
export default class TodoService {
    constructor(
        private prisma: PrismaService
    ) {}

    async createTodo(data) {
        const { id, text, ddl, complete, priority, userId } = data
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
}