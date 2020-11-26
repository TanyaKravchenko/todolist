import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from './components/TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import {Menu} from '@material-ui/icons';
import {Button, Container, Grid, Paper, Toolbar, Typography} from '@material-ui/core';
import {CSSProperties} from '@material-ui/core/styles/withStyles';
import {
    addTodoListAC,
    changeTodolistFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

let paddingStyle: CSSProperties = {padding: '25px'};

function AppWithReducers() {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, dispatchToTodoListsReducer] = useReducer(todoListsReducer,
        [
            {id: todoListId1, title: 'What to learn', filter: 'All'},
            {id: todoListId2, title: 'What to buy', filter: 'All'}
        ]
    )

    let [tasks, dispatchTasksReducer] = useReducer(tasksReducer, {
        [todoListId1]: [
            {id: v1(), title: 'CSS&HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
        ],
    });

    function removeTask(id: string, todoListId: string) {
        dispatchTasksReducer(removeTaskAC(id, todoListId))
    }

    function addTask(title: string, todoListId: string) {
        dispatchTasksReducer(addTaskAC(title, todoListId))
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        dispatchTasksReducer(changeTaskStatusAC(taskId, isDone, todoListId))
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        dispatchToTodoListsReducer(changeTodolistFilterAC(todoListId, value))
    }

    function addTodoList(title: string) {
        let action = addTodoListAC(title)
        dispatchTasksReducer(action)
        dispatchToTodoListsReducer(action)
    }

    function removeTodoList(todoListId: string) {
        let action = removeTodoListAC(todoListId);
        dispatchToTodoListsReducer(action);
        dispatchTasksReducer(action);
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        dispatchToTodoListsReducer(changeTodoListTitleAC(id, newTitle))
        }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        dispatchTasksReducer(changeTaskTitleAC(taskId, newTitle, todoListId))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container style={paddingStyle}>
                    <AddItemForm onAddItemClick={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            let allTodoListTasks = tasks[tl.id];
                            let tasksForTodoList = allTodoListTasks;
                            if (tl.filter === 'Active') {
                                tasksForTodoList = allTodoListTasks.filter(t => t.isDone === false)
                            }
                            if (tl.filter === 'Completed') {
                                tasksForTodoList = allTodoListTasks.filter(t => t.isDone === true)
                            }

                            return <Grid item key={tl.id}>
                                <Paper style={paddingStyle} elevation={3}>
                                    <TodoList
                                        title={tl.title}
                                        key={tl.id}
                                        id={tl.id}
                                        tasks={tasksForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;

//c 1 по 6 урок Todolist for students (до добавления material-ui) =>

// export function App() {
//     let todoListId1 = v1();
//     let todoListId2 = v1();
//     let [todoLists, setTodoLists] = useState<Array<TodoListType>>(
//         [
//             {id: todoListId1, title: 'What to learn', filter: 'All'},
//             {id: todoListId2, title: 'What to buy', filter: 'All'}
//         ]
//     )
//
//     let [tasks, setTasks] = useState<TaskStateType>({
//         [todoListId1]: [
//             {id: v1(), title: 'CSS&HTML', isDone: true},
//             {id: v1(), title: 'JS', isDone: true},
//             {id: v1(), title: 'React', isDone: false},
//         ],
//         [todoListId2]: [
//             {id: v1(), title: 'Book', isDone: true},
//             {id: v1(), title: 'Milk', isDone: true},
//         ],
//     });
//
//     function removeTask(id: string, todoListId: string) {
//         let todoListTasks = tasks[todoListId];
//         tasks[todoListId] = todoListTasks.filter(t => t.id !== id)
//         setTasks({...tasks});
//     }
//
//     function addTask(title: string, todoListId: string) {
//         let newTask = {id: v1(), title: title, isDone: false}
//         let todoListTasks = tasks[todoListId];
//         tasks[todoListId] = [newTask, ...todoListTasks]
//         setTasks({...tasks})
//     }
//
//     function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
//         let todoListTasks = tasks[todoListId];
//         let task = todoListTasks.find(t => t.id === taskId)
//         if (task) {
//             task.isDone = isDone;
//         }
//         setTasks({...tasks});
//     }
//
//     function changeFilter(value: FilterValuesType, todoListId: string) {
//         debugger
//         let todoList = todoLists.find(tl => tl.id === todoListId);
//         if (todoList) {
//             todoList.filter = value;
//             setTodoLists([...todoLists]);
//         }
//     }
//
//     function addTodoList(title: string) {
//         let todoList: TodoListType = {
//             id: v1(),
//             filter: 'All',
//             title: title
//         }
//         setTodoLists([todoList, ...todoLists]);
//         setTasks({...tasks, [todoList.id]: []})
//     }
//
//     function removeTodoList(todoListId: string) {
//         setTodoLists(todoLists.filter(tl => tl.id !== todoListId));
//         delete tasks[todoListId];
//         setTasks({...tasks});
//     }
//
//     function changeTodoListTitle(id: string, newTitle: string) {
//         const todoList = todoLists.find(tl => tl.id == id);
//         if(todoList) {
//             todoList.title = newTitle;
//             setTodoLists([...todoLists])
//         }
//     }
//
//     function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
//         let todoListTasks = tasks[todoListId];
//         let task = todoListTasks.find(t => t.id === taskId)
//         if (task) {
//             task.title = newTitle;
//         }
//         setTasks({...tasks});
//     }
//
//     return (
//         <div className="App">
//             <AddItemForm onAddItemClick={addTodoList}/>
//             {
//                 todoLists.map(tl => {
//                     let allTodoListTasks = tasks[tl.id];
//                     let tasksForTodoList = allTodoListTasks;
//                     if (tl.filter === 'Active') {
//                         tasksForTodoList = allTodoListTasks.filter(t => t.isDone)
//                     }
//                     if (tl.filter === 'Completed') {
//                         tasksForTodoList = allTodoListTasks.filter(t => t.isDone)
//                     }
//
//                     return <TodoList title={tl.title}
//                                      key={tl.id}
//                                      id={tl.id}
//                                      tasks={tasksForTodoList}
//                                      removeTask={removeTask}
//                                      changeFilter={changeFilter}
//                                      addTask={addTask}
//                                      changeTaskStatus={changeStatus}
//                                      changeTaskTitle={changeTaskTitle}
//                                      filter={tl.filter}
//                                      removeTodoList={removeTodoList}
//                                      changeTodoListTitle={changeTodoListTitle}
//                     />
//                 })}
//         </div>
//     );
// }
//
