import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValueType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValueType
}

export function TodoList(props: PropsType) {
    let [title, setTitle] = useState<string>('');
    let [error, setError] =useState<string | null>(null);

    let jsxTasks = props.tasks.map((t) => {
        const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeStatus(t.id, newIsDoneValue);
        }
        return (
            <li key={t.id} className={(props.filter === 'all' && t.isDone) ? 'is-done' : ''}>
                <input
                    type='checkbox'
                    checked={t.isDone}
                    onChange={onChangeHandler}
                />
                <span>{t.title}</span>
                <button onClick={() => {
                    props.removeTasks(t.id)
                }}>X
                </button>
            </li>
        )
    });

    const onAddTaskClick = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
        } else {
            setError('Title is required')
        }
        setTitle('');
    }

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(e.currentTarget.value)
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            onAddTaskClick()
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter('all')
    }

    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }

    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }

    const allBtnClass = props.filter === 'all' ? 'active-filter' : '';
    const activeBtnClass = props.filter === 'active' ? 'active-filter' : '';
    const competedBtnClass = props.filter === 'completed' ? 'active-filter' : '';

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    type='text'
                    value={title}
                    onChange={onTitleChange}
                    onKeyPress={onKeyPressAddTask}
                    className={error ? 'error' : ''}
                />
                <button onClick={onAddTaskClick}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {jsxTasks}
            </ul>
            <div>
                <button className={allBtnClass}
                        onClick={onAllClickHandler}>All</button>
                <button className={activeBtnClass}
                        onClick={onActiveClickHandler}>Active</button>
                <button className={competedBtnClass}
                        onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}
