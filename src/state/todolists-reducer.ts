import {v1} from 'uuid';
import {TodoListType} from '../api/todolist-api';

// type ActionType = {
//     type: string
//     [key: string]: any
// }

export type FilterValuesType = 'All' | 'Active' | 'Completed'
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
}
export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type SetTodoListActionType = {
    type: 'SET-TODOLISTS'
    todoLists: Array<TodoListType>
}

type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType
    | SetTodoListActionType

const initialState: Array<TodoListDomainType> = []

export const todoListsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todoListId,
                title: action.title,
                filter: 'All',
                addedDate: '',
                order: 0
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.filter = action.filter;
            }
            return [...state]
        }
        case 'SET-TODOLISTS': {
            return action.todoLists.map(tl => {
                return {
                    ...tl,
                    filter: 'All'
                }
            })
        }
        default:
            return state;
    }
}

export const removeTodoListAC = (todoListId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todoListId}
}

export const addTodoListAC = (title: string): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title: title, todoListId: v1()}
}

export const changeTodoListTitleAC = (todoListId: string, title: string): ChangeTodoListTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todoListId, title: title}
}

export const changeTodolistFilterAC = (todoListId: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todoListId}
}

export const setTodolistAC = (todoLists: Array<TodoListType>): SetTodoListActionType => {
    return {type: 'SET-TODOLISTS', todoLists: todoLists}
}

