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
}

export function TodoList(props: PropsType) {
    let [title, setTitle] = useState<string>('');

    const onAddTaskClick = () => {
        props.addTask(title);
        setTitle('');
    }

    let jsxTasks = props.tasks.map((t) => {
        return (
            <li key={t.id}>
                <input type='checkbox' checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => {
                    props.removeTasks(t.id)
                }}>X
                </button>
            </li>
        )
    });

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
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

    return (
        <div className="App">
            <h3>{props.title}</h3>
            <div>
                <input
                    type='text'
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={onAddTaskClick}>+</button>
            </div>
            <ul>
                {jsxTasks}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}
