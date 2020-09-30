import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodoListActionType, RemoveTodoListActionType} from './todolists-reducer';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todoListId: string
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    isDone: boolean
    todoListId: string
    taskId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todoListId: string
}


type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todoListId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todoListId] = filteredTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            // const stateCopy = {...state};
            // const tasks = stateCopy[action.todoListId];
            // const newTask = {id: v1(), title: action.title, isDone: false};
            // const newTasks = [newTask, ...tasks];
            // stateCopy[action.todoListId] = newTasks;
            // return stateCopy;
            // или можно написать так:
            let task = {id: v1(), title: action.title, isDone: false};
            let copyState = {...state};
            let todoListTasks = copyState[action.todoListId];
            todoListTasks = [task, ...todoListTasks];
            return {...copyState, [action.todoListId]: todoListTasks}
        }
        case 'CHANGE-TASK-STATUS': {
            // let copyState = {...state};
            // let todoListTasks = copyState[action.todoListId]
            //     .map(task => {
            //         if (task.id !== action.taskId) {
            //             return task;
            //         } else {
            //             return {...task, isDone: action.isDone}
            //         }
            //     });
            // лучше так:
            return {
                ...state, [action.todoListId]: state[action.todoListId]
                    .map(task => {
                        if (task.id !== action.taskId) {
                            return task
                        } else {
                            return {...task, isDone: action.isDone}
                        }
                    })
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state, [action.todoListId]: state[action.todoListId]
                    .map(task => {
                        if (task.id !== action.taskId) {
                            return task
                        } else {
                            return {...task, title: action.title}
                        }
                    })
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state, [action.todoListId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState [action.id]
            return copyState
        }
        default:
            throw new Error('I don\'t understand this type')
    }
}
export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todoListId: todoListId}
}

export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todoListId}
}

export const changeTaskStatusAC = (taskId: string,
                                   isDone: boolean,
                                   todoListId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', isDone, todoListId, taskId}
}
export const changeTaskTitleAC = (taskId: string,
                                  title: string,
                                  todoListId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todoListId}
}


// let changeTitleAndStatus = (tasks: Array<TaskType>, taskId: string, property: string | boolean) => {
//     let propertyName = typeof property === 'string'? 'title' :'isDone'
//     return [...tasks.map(task => {
//         if (taskId !== taskId) {
//             return task;
//         } else {
//             return {...task,[ propertyName]: property}
//         }
//     })]}