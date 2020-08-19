import React, {CSSProperties, useState} from 'react';
import './App.css';
import {TodoList} from './components/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

export type FilterValueType = 'all' | 'active' | 'completed';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

let paddingStyle: CSSProperties = {padding: '15px'};

function App() {

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'Books', filter: 'all'},
        {id: todoListId2, title: 'Songs', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'Redux', isDone: true},
        ],
        [todoListId2]: [
            {id: v1(), title: 'Yo', isDone: true},
            {id: v1(), title: 'La-la', isDone: false},
        ]
    });

    function removeTasks(id: string, todoListId: string) {
        let todoListTasks = tasks[todoListId];
        tasks[todoListId] = todoListTasks.filter(t => t.id !== id);
        setTasks({...tasks});
    }

    function addTask(title: string, todoListId: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let todoListTasks = tasks[todoListId];
        tasks[todoListId] = [newTask, ...todoListTasks]
        setTasks({...tasks});
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let todoListTasks = tasks[todoListId];
        let task = todoListTasks.find(task => task.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function changeTaskTitle(id: string, title: string, todoListId: string) {
        let todoListTasks = tasks[todoListId];
        let task = todoListTasks.find(task => task.id === id);
        if (task) {
            task.title = title;
            setTasks({...tasks})
        }
    }

    function changeFilter(id: string, value: FilterValueType) {
        let todoList = todoLists.find(tl => tl.id === id);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(id: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== id));
        delete tasks[id];
        setTasks({...tasks});
    }

    function addTodoLIst(title: string) {
        let newTodoListId = v1();
        let newTodoList: TodoListType = {
            id: newTodoListId,
            title: title,
            filter: 'all'
        }
        setTodoLists([newTodoList, ...todoLists]);
        setTasks({
            ...tasks,
            [newTodoListId]: []
        })
    }

    function changeTodoListTitle(newTitle: string, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.title = newTitle;
            setTodoLists([...todoLists]);
        }
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
            <Container fixed>
                <Grid container style={paddingStyle}>
                    <AddItemForm addItem={addTodoLIst}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            let allTasks = tasks[tl.id]
                            let tasksForTodoList = allTasks;

                            if (tl.filter === 'active') {
                                tasksForTodoList = allTasks.filter(t => t.isDone === false)
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodoList = allTasks.filter(t => t.isDone === true)
                            }
                            return (
                                <Grid item key={tl.id}>
                                    <Paper style={paddingStyle} elevation={3}>
                                        <TodoList
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodoList}
                                            removeTasks={removeTasks}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeStatus={changeStatus}
                                            filter={tl.filter}
                                            removeTodoList={removeTodoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
