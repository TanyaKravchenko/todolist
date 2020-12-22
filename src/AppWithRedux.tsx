import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from './components/TodoList';
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
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

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

function AppWithRedux() {
    console.log('App is called')
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

    const removeTask = useCallback((id: string, todoListId: string) => {
        dispatch(removeTaskAC(id, todoListId))
    }, [dispatch]);

    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }, [dispatch]);

    const changeStatus = useCallback((taskId: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    }, [dispatch]);

    const changeFilter = useCallback((value: FilterValuesType, todoListId: string) => {
        dispatch(changeTodolistFilterAC(todoListId, value))
    }, [dispatch]);

    const addTodoList = useCallback((title: string) => {
        let action = addTodoListAC(title)
        dispatch(action)
    }, [dispatch]);

    const removeTodoList = useCallback((todoListId: string) => {
        let action = removeTodoListAC(todoListId);
        dispatch(action);
    }, [dispatch]);

    const changeTodoListTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodoListTitleAC(id, newTitle))
    }, [dispatch]);

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todoListId))
    }, [dispatch]);

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


                            return <Grid item key={tl.id}>
                                <Paper style={paddingStyle} elevation={3}>
                                    <TodoList
                                        title={tl.title}
                                        key={tl.id}
                                        id={tl.id}
                                        tasks={allTodoListTasks}
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

export default AppWithRedux;