import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskType} from '../App';

export type TaskPropsType = {
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    removeTask: (id: string, todoListId: string) => void
    task: TaskType
    todoListId: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const onRemoveHandler = () => {
        props.removeTask(props.task.id, props.todoListId)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListId)
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todoListId)
    }, [props.task.id, props.changeTaskTitle, props.todoListId]);

    return <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox color={'primary'} checked={props.task.isDone} onChange={onChangeHandler}/>
        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        <IconButton color={'primary'} onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>
    </div>
});