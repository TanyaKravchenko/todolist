import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValueType, TaskType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTasks: (id: string, todoListId: string) => void
    changeFilter: (id: string, value: FilterValueType) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValueType
    removeTodoList: (id: string) => void
    changeTaskTitle: (id: string, title: string, todoListId: string) => void
}

export function TodoList(props: PropsType) {

    let jsxTasks = props.tasks.map((t) => {

        const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeStatus(t.id, newIsDoneValue, props.id);
        }

        const onTitleChangeCallback = (newTitle: string) => {
            props.changeTaskTitle(t.id, newTitle, props.id)
        }

        return (
            <li key={t.id} className={(props.filter === 'all' && t.isDone) ? 'is-done' : ''}>
                <input
                    type='checkbox'
                    checked={t.isDone}
                    onChange={onStatusChangeHandler}
                />
                <EditableSpan title={t.title} saveTitle={onTitleChangeCallback}/>
                <button onClick={() => {
                    props.removeTasks(t.id, props.id)
                }}>x
                </button>
            </li>
        )
    });

    const createTaskTitle = (title: string) => {
        props.addTask(title, props.id);
    }

    const deleteTodoList = () => {
        props.removeTodoList(props.id)
    };
    const onAllClickHandler = () => {
        props.changeFilter(props.id, 'all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.id, 'active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.id, 'completed')
    }
    const allBtnClass = props.filter === 'all' ? 'active-filter' : '';
    const activeBtnClass = props.filter === 'active' ? 'active-filter' : '';
    const competedBtnClass = props.filter === 'completed' ? 'active-filter' : '';

    return (
        <div>
            <h3>{props.title}
                <button onClick={deleteTodoList}>x</button>
            </h3>
            <AddItemForm addItem={createTaskTitle}/>
            <ul>
                {jsxTasks}
            </ul>
            <div>
                <button className={allBtnClass}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={activeBtnClass}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={competedBtnClass}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}
