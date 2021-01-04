import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '5a5d4a76-8987-43b9-a09e-9693af49f2eb'
    }
})

export type TodoListType= {
    id: string
    addedDate: string
    order: number
    title: string
}

type CommonResponseType<T={}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    later
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export const todolistAPI = {
    getTodos() {
        return instance.get<Array<TodoListType>>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType<{ item: TodoListType }>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title: title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post<CommonResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle});
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    updateTask (todolistId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    },
}