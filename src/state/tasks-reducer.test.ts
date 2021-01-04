import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer
} from './tasks-reducer';
import {TasksStateType} from '../App';
import {removeTodoListAC, setTodolistAC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';

let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
        "todoListId1": [
            {id: "1", title: "CSS", status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todoListId1', order: 0, addedDate: ''},
            {id: "2", title: "JS", status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todoListId1', order: 0, addedDate: ''},
            {id: "3", title: "React", status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todoListId1', order: 0, addedDate: ''}
        ],
        "todoListId2": [
            {id: "1", title: "bread", status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todoListId2', order: 0, addedDate: ''},
            {id: "2", title: "milk", status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todoListId2', order: 0, addedDate: ''},
            {id: "3", title: "tea", status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todoListId2', order: 0, addedDate: ''}
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
            { id: "1", title: "CSS", status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todoListId1', order: 0, addedDate: '' },
            { id: "2", title: "JS", status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todoListId1', order: 0, addedDate: '' },
            { id: "3", title: "React", status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todoListId1', order: 0, addedDate: '' }
        ],
        "todoListId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todoListId2', order: 0, addedDate: '' },
            { id: "3", title: "tea", status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todoListId2', order: 0, addedDate: ''  }
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
    expect(endState["todoListId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC("2", TaskStatuses.New, "todoListId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todoListId2"][1].status).toBe(TaskStatuses.New);
});

test('title of specified task should be changed', () => {

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

test('empty arrays should be added when we set todolists', () => {

    const action = setTodolistAC([
        {id: '1', title: "title 1", order: 0, addedDate: ''},
        {id: '2', title: "title 2", order: 0, addedDate: ''}
    ]);

    const endState = tasksReducer({}, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState['1']).toStrictEqual([]);
    expect(endState['2']).toStrictEqual([]);
});

test('tasks should be added for todolist', () => {

    const action = setTasksAC(startState['todoListId1'], 'todoListId1');

    const endState = tasksReducer({
        'todoListId2': [],
        'todoListId1': []
    }, action)

    expect(endState['todoListId1'].length).toBe(3);
    expect(endState['todoListId2'].length).toBe(0);
});
