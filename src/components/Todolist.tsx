import React, {useCallback} from 'react';
import {FilterValuesType, TaskType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    removeTask: (id: string, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export const TodoList = React.memo((props: PropsType) => {
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
        tasksForTodoList = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === 'Completed') {
        tasksForTodoList = props.tasks.filter(t => t.isDone === true)
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

//c 1 по 6 урок Todolist for students (до добавления material-ui) =>

// export function TodoList(props: PropsType) {
//     const onAllClickHandler = () => props.changeFilter('All', props.id);
//     const onActiveClickHandler = () => props.changeFilter('Active', props.id);
//     const onCompletedClickHandler = () => props.changeFilter('Completed', props.id);
//
//     const deleteTodoList = () => props.removeTodoList(props.id);
//
//     const addTask = (title: string) => {
//         props.addTask(title, props.id)
//     }
//
//     const changeTodoListTitle = (newTitle: string) => {
//         props.changeTodoListTitle(props.id, newTitle);
//     }
//
//     return (
//         <div>
//             <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
//                 <button onClick={deleteTodoList}>X</button>
//             </h3>
//             <AddItemForm onAddItemClick={addTask}/>
//             <ul>
//                 {
//                     props.tasks.map((t) => {
//
//                         const onRemoveHandler = () => {
//                             props.removeTask(t.id, props.id)
//                         }
//                         const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//                             props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
//                         }
//                         const onChangeTitleHandler = (newValue: string) => {
//                             props.changeTaskTitle(t.id, newValue, props.id)
//                         }
//
//                         return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
//                             <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
//                             <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
//                             <button onClick={onRemoveHandler}>x</button>
//                         </li>
//                     })
//                 }
//             </ul>
//             <div>
//                 <button className={props.filter === 'All' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
//                 </button>
//                 <button className={props.filter === 'Active' ? 'active-filter' : ''}
//                         onClick={onActiveClickHandler}>Active
//                 </button>
//                 <button className={props.filter === 'Completed' ? 'active-filter' : ''}
//                         onClick={onCompletedClickHandler}>Completed
//                 </button>
//             </div>
//         </div>
//     );
// }

