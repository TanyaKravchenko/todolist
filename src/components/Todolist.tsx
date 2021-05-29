import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';
import {TaskStatuses, TaskType} from '../api/todolist-api';
import {FilterValuesType} from '../state/todolists-reducer';
import {useDispatch} from 'react-redux';
import {fetchTasksTC} from '../state/tasks-reducer';
import s from './TodoList.module.css'

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    removeTask: (id: string, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export const TodoList = React.memo((props: PropsType) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])

    const onAllClickHandler = useCallback(() => props.changeFilter('All', props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter('Active', props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter('Completed', props.id), [props.changeFilter, props.id]);

    const deleteTodoList = () => props.removeTodoList(props.id);

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id]);

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }, [props.id, props.changeTodoListTitle]);

    let tasksForTodoList = props.tasks;

    if (props.filter === 'Active') {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'Completed') {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                <IconButton onClick={deleteTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm onAddItemClick={addTask}/>
            <div>
                {
                    tasksForTodoList.map((t) => <Task
                        task={t}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        todoListId={props.id}
                        key={t.id}
                    />)
                }
            </div>
            <div>
                <Button variant={'outlined'}
                        color={props.filter === 'All' ? 'secondary' : 'primary'}
                        onClick={onAllClickHandler}
                        className={s.ButtonContainer}
                >All
                </Button>
                <Button variant={'outlined'}
                        color={props.filter === 'Active' ? 'secondary' : 'primary'}
                        onClick={onActiveClickHandler}
                >Active
                </Button>
                <Button variant={'outlined'}
                        color={props.filter === 'Completed' ? 'secondary' : 'primary'}
                        onClick={onCompletedClickHandler}
                >Completed
                </Button>
            </div>
        </div>
    );
});