import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {Button, IconButton, TextField} from '@material-ui/core';
import {AddBox, TextFields} from '@material-ui/icons';

type AddItemFormType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormType) {
    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const onAddItemClick = () => {
        if (title.trim() !== '') {
            props.addItem(title);
        } else {
            setError('Title is required')
        }
        setTitle('');
    }

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(e.currentTarget.value)
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            onAddItemClick()
        }
    }
    return (
        <div onBlur={() => setError(null)}>
            <TextField
                variant={'outlined'}
                value={title}
                onChange={onTitleChange}
                onKeyPress={onKeyPressAddItem}
                error={!!error}
                label={'Title'}
                helperText={error}
                //className={error ? 'error' : ''}
            />
            {/*<input*/}
            {/*    type='text'*/}
            {/*    value={title}*/}
            {/*    onChange={onTitleChange}*/}
            {/*    onKeyPress={onKeyPressAddItem}*/}
            {/*    className={error ? 'error' : ''}*/}
            {/*/>*/}
            <IconButton color={'primary'} onClick={onAddItemClick}>
                <AddBox />
            </IconButton>
            {/*<Button*/}
            {/*    variant={'contained'} color={'primary'} onClick={onAddItemClick}>+</Button>*/}
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
        </div>
    );
}
