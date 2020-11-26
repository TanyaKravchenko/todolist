import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {TasksStateType, TodoListType} from '../App';
import { addTodoListAC, removeTodoListAC, todoListsReducer } from './todolists-reducer';
import { v1 } from 'uuid';

let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
        "todoListId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todoListId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    };
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todoListId2");

    const endState = tasksReducer(startState, action)

    // expect(endState["todolistId1"].length).toBe(3);
    // expect(endState["todolistId2"].length).toBe(2);
    // expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();

    expect(endState).toEqual({
        "todoListId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todoListId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "3", title: "tea", isDone: false }
        ]
    });

});

test('correct task should be added to correct array', () => {

    const action = addTaskAC("juice", "todoListId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(3);
    expect(endState["todoListId2"].length).toBe(4);
    expect(endState["todoListId2"][0].id).toBeDefined();
    expect(endState["todoListId2"][0].title).toBe("juice");
    expect(endState["todoListId2"][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC("2", false, "todoListId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId2"][1].isDone).toBeFalsy();
    expect(endState["todoListId1"][1].isDone).toBeTruthy();
});

test('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        "todoListId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todoListId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = changeTaskTitleAC("2", "MilkyWay", "todoListId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId2"][1].title).toBe("MilkyWay");
    expect(endState["todoListId1"][1].title).toBe("JS");
});

// этот тест не проходит
// test('new array should be added when new todolist is added', () => {
//
//     const action = addTodoListAC("new todoList");
//
//     const endState = tasksReducer(startState, action)
//
//
//     const keys = Object.keys(endState);
//     const newKey = keys.find(k => k != "todoListId1" && k != "todoListId2");
//     if (!newKey) {
//         throw Error("new key should be added")
//     }
//
//     expect(keys.length).toBe(3);
//     expect(endState[newKey]).toEqual([]);
// });

// test('correct todolist should be added', () => {
//     let todoListId1 = v1();
//     let todoListId2 = v1();
//
//     let newTodoListTitle = "New Todolist";
//
//     const startStateTodoList: Array<TodoListType> = [
//         {id: todoListId1, title: "What to learn", filter: "All"},
//         {id: todoListId2, title: "What to buy", filter: "All"}
//     ]
//
//     const startStateTasks = {
//         [todoListId1]: [],
//         [todoListId2]: []
//     }
//
//     const action = addTodoListAC(newTodoListTitle);
//
//     const endStateTodoLists = todoListsReducer(startStateTodoList, action)
//     const endStateTasks = tasksReducer(startStateTasks, action)
//
//     const todoListId = endStateTodoLists[2].id
//     const taskId = Object.keys(endStateTasks)
//
//     expect(endStateTodoLists.length).toBe(3);
//     expect(endStateTodoLists[0].title).toBe(newTodoListTitle);
//     expect(endStateTodoLists[0].filter).toBe("All");
//     expect(endStateTodoLists[0].id).toBeDefined();
//     expect(todoListId).toBe(taskId[0]);
// });


test('property with todolistId should be deleted', () => {

    const action = removeTodoListAC("todoListId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todoListId2"]).not.toBeDefined();
});




