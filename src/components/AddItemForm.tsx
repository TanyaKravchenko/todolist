import React, {useState, ChangeEvent, KeyboardEvent} from 'react';

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
        <div>
            <input
                type='text'
                value={title}
                onChange={onTitleChange}
                onKeyPress={onKeyPressAddItem}
                className={error ? 'error' : ''}
            />
            <button onClick={onAddItemClick}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
}
