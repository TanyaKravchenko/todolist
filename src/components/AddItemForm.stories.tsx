import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {AddItemForm, AddItemFormPropsType} from './AddItemForm';
import {action} from '@storybook/addon-actions';

export default {
    title: 'TodoList/AddItemForm',
    component: AddItemForm,
    argTypes: {
        onAddItemClick: {
            description: 'Add item after push button'
        },
    },
} as Meta;

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
    onAddItemClick: action('Button clicked')
};
