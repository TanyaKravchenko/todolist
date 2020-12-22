import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '5a5d4a76-8987-43b9-a09e-9693af49f2eb'
    }
})

type TodoType= {
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

export const todolistAPI = {
    getTodos() {
        return instance.get<Array<TodoType>>('todo-lists');
    },
    createTodolist(title: string) {
        return  instance.post<CommonResponseType<{item: TodoType}>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title: title})
    }
}
