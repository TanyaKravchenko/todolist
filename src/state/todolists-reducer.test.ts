import {
    addTodoListAC,
    changeTodolistFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from '../App';

let todoListId1: string;
let todoListId2: string;
let startState: Array<TodoListType>

beforeEach(() => {
    todoListId1 = v1();
    todoListId2 = v1();

    startState = [
        {id: todoListId1, title: 'What to learn', filter: 'All'},
        {id: todoListId2, title: 'What to buy', filter: 'All'}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todoListsReducer(startState, removeTodoListAC(todoListId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist';

    const endState = todoListsReducer(startState, addTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe('All');
    expect(endState[0].id).toBeDefined();
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist';

    const action = changeTodoListTitleAC(todoListId2, newTodolistTitle);

    const endState = todoListsReducer(startState, action);

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'Completed';

    const action = changeTodolistFilterAC(todoListId2, newFilter)

    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe('All');
    expect(endState[1].filter).toBe(newFilter);
});



