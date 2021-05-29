import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';
import s from './AddItemForm.module.css'

export type AddItemFormPropsType = {
    onAddItemClick: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm is called')
    let [newTaskTitle, setNewTaskTitle] = useState('');
    let [error, setError] = useState<string | null>(null);

    const onAddItemClick = () => {
        if (newTaskTitle.trim() !== '') {
            props.onAddItemClick(newTaskTitle.trim());
        } else {
            setError('Title is required')
        }
        setNewTaskTitle('');
    }

    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setNewTaskTitle(e.currentTarget.value);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            onAddItemClick();
        }
    }

    return (
        <div className={s.TextFieldContainer} onBlur={() => setError(null)}>
            <TextField
                variant={'outlined'}
                error={!!error}
                label='Title'
                value={newTaskTitle}
                onChange={onTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
                helperText={error}
            />
            <IconButton onClick={onAddItemClick} color={'primary'}><AddBox /></IconButton>
        </div>
    )
});


//c 1 по 6 урок Todolist for students (до добавления material-ui) =>

// export function AddItemForm(props: AddItemFormPropsType) {
//     let [newTaskTitle, setNewTaskTitle] = useState('');
//     let [error, setError] = useState<string | null>(null);
//
//     const onAddItemClick = () => {
//         if (newTaskTitle.trim() !== '') {
//             props.onAddItemClick(newTaskTitle.trim());
//         } else {
//             setError('Title is required')
//         }
//         setNewTaskTitle('');
//     }
//
//     const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//         setError(null);
//         setNewTaskTitle(e.currentTarget.value);
//     }
//
//     const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
//         setError(null);
//         if (e.charCode === 13) {
//             onAddItemClick();
//         }
//     }
//     return (
//         <div onBlur={() => setError(null)}>
//             <input
//                 className={error ? 'error' : ''}
//                 value={newTaskTitle}
//                 onChange={onTitleChangeHandler}
//                 onKeyPress={onKeyPressHandler}
//             />
//             <button onClick={onAddItemClick}>+</button>
//             {error && <div className='error-massage'>{error}</div>}
//         </div>
//     )
//
// }