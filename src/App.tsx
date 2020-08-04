import React, {useState} from 'react';
import './App.css';
import {TodoList} from './Todolist';
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

export type FilterValueType = 'all' | 'active' | 'completed';

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'Books', filter: 'all'},
        {id: todoListId2, title: 'Songs', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
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

    //let [filter, setFilter] = useState<FilterValueType>('all');

    return (
        <div className="App">
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
                        <TodoList
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodoList}
                            removeTasks={removeTasks}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={tl.filter}
                            removeTodoList={removeTodoList}
                        />
                    )
                })
            }


        </div>
    );
}

export default App;
