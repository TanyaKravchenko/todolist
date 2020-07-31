import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed';

function App() {
    let [tasks, setTasks] = useState <Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'React API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: true},
    ]);

    function removeTasks(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    let [filter, setFilter] = useState<FilterValueType>('all');

    let tasksForTodoList = tasks;

    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }

    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }

    return (
        <div>
            <TodoList
                title='What to learn'
                tasks={tasksForTodoList}
                removeTasks={removeTasks}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
