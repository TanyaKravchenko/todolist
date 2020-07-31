import React from 'react';
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
}

export function TodoList(props: PropsType) {
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
    return (
        <div className="App">
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>

            <ul>
                {jsxTasks}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter('all')
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter('active')
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter('completed')
                }}>Completed
                </button>
            </div>
        </div>
    );
}
