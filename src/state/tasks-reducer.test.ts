import {removeTaskAC, tasksReducer, addTaskAC, changeTaskStatusAC, changeTaskTitleAC} from './tasks-reducer';
import {TasksStateType, TodoListType} from '../App';
import {v1} from 'uuid';
import {AddTodoListAC, RemoveTodoListAC, todoListsReducer} from './todolists-reducer';

let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});


test('correct task should be added to correct array', () => {

    const action = addTaskAC("juce", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].isDone).toBe(false);
})


test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC("2", false, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(3);

    expect(endState["todolistId2"][1].isDone).toBe(false);
    expect(endState["todolistId1"][1].isDone).toBe(true);
});


test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC("2", "beer", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(3);

    expect(endState["todolistId2"][1].title).toBe("beer");
    expect(endState["todolistId1"][1].title).toBe("JS");
});

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodoListTitle = "New Todolist";

    const startStateTodoList: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const startStateTasks = {
        [todolistId1]: [],
        [todolistId2]: []
    }

    const action = AddTodoListAC(newTodoListTitle);

    const endStateTodoLists = todoListsReducer(startStateTodoList, action)
    const endStateTasks = tasksReducer(startStateTasks, action)

    const todoListId = endStateTodoLists[2].id
    const taskId = Object.keys(endStateTasks)

    expect(endStateTodoLists.length).toBe(3);
    expect(endStateTodoLists[2].title).toBe(newTodoListTitle);
    expect(endStateTodoLists[2].filter).toBe("all");
    expect(endStateTodoLists[2].id).toBeDefined();
    expect(todoListId).toBe(taskId[2]);
});


test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const startStateTasks = {
        [todolistId1]: [],
        [todolistId2]: []
    }

    const  action = RemoveTodoListAC(todolistId1)
    const endStateTodoLists = todoListsReducer(startState, action)
    const endStateTasks = tasksReducer(startStateTasks, action)
    const taskId = Object.keys(endStateTasks)

    expect(endStateTodoLists.length).toBe(1);
    expect(endStateTodoLists[0].id).toBe(todolistId2);
    expect(taskId.length).toBe(1);
});
