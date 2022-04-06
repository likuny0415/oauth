export interface FinishTodo {
    id: string
}

export interface DeleteTodo {
    id: string
}

export interface EditTodo {
    id: string,
    text: string,
    ddl: Date,
    priority: number
}