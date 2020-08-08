import {FilterValueType, TodoListType} from '../App';
import {v1} from 'uuid';

// type ActionType = {
//     type: string
//     [key: string]: any
// }
export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValueType
    id: string
}
type ActionType = RemoveTodoListActionType | AddTodoListActionType |
    ChangeTodoListTitleActionType | ChangeTodoListFilterActionType


export const todoListsReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            let newTodoList: TodoListType = {
                id: v1(),
                title: action.title,
                filter: 'all'
            }
            return [...state, newTodoList];
        case 'CHANGE-TODOLIST-TITLE':
            let todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title;
                return [...state];
            }
                return state;
        case 'CHANGE-TODOLIST-FILTER':
            // let todoListT = state.find(tl => tl.id === action.id)
            // if (todoListT) {
            //     todoListT.filter = action.title;
            //     return [...state];
            // }
            // return state;
            return state.map(tl => {
                if(tl.id === action.id) {
                    tl.filter = action.filter
                }
                return tl;
            });
        default:
            throw new Error('I don\'t understand this type')
    }
}
export const RemoveTodoListAC = (todoListId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todoListId}
}
export const AddTodoListAC = (newTitle: string): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title: newTitle}
}