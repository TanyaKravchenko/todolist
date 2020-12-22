import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

export type EditableSpanPropsType = {
    title: string
    onChange: (newValue:string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan')
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState('');

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
        ? <TextField
            variant={'outlined'}
            value={title}
            onChange={onChangeTitleHandler}
            onBlur={activateViewMode}
            autoFocus /> : <span onDoubleClick={activateEditMode}>{props.title}</span>
});

//c 1 по 6 урок Todolist for students (до добавления material-ui) =>

// export function EditableSpan(props: EditableSpanPropsType) {
//     let [editMode, setEditMode] = useState(false);
//     let [title, setTitle] = useState('');
//
//     const activateEditMode = () => {
//         setEditMode(true);
//         setTitle(props.title)
//     }
//     const activateViewMode = () => {
//         setEditMode(false);
//         props.onChange(title);
//     }
//     const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
//
//     return editMode
//         ? <input value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus /> : <span onDoubleClick={activateEditMode}>{props.title}</span>
// }