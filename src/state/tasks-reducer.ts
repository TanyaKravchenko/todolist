import {v1} from 'uuid';
import {TasksStateType} from '../App';
import {
    AddTodoListActionType,
    RemoveTodoListActionType,
    SetTodoListActionType
} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI} from '../api/todolist-api';
import {Dispatch} from 'redux';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    status: TaskStatuses
    todoListId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todoListId: string
}
export type SetTaskActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todoListId: string
}

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodoListActionType
    | SetTaskActionType

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todoListId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todoListId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId];
            const newTask = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: action.todoListId,
                order: 0,
                addedDate: ''
            };
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todoListId] = newTasks
            return stateCopy
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
                        if (task.id !== action.taskID) {
                            return task
                        } else {
                            return {...task, status: action.status}
                        }
                    })
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
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
            // const stateCopy = {...state}
            // stateCopy[v1()] = [];
            // return stateCopy
            return {
                ...state, [action.todoListId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        case 'SET-TODOLISTS': {
            let copyState = {...state}
            action.todoLists.forEach(tl => {
                copyState[tl.id] = [];
            })
            return copyState
        }
        case 'SET-TASKS': {
            let copyState = {...state}
            copyState[action.todoListId] = action.tasks;
            return copyState
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todoListId}
}

export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todoListId}
}

export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todoListId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskID, status, todoListId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todoListId}
}

export const setTasksAC = (tasks: Array<TaskType>, todoListId: string): SetTaskActionType => {
    return {type: 'SET-TASKS', tasks: tasks, todoListId: todoListId}
}

export const fetchTasksTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todoListId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todoListId))
            })
    }
}