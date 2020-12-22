import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';
import {action} from '@storybook/addon-actions';
import {Task, TaskPropsType} from './Task';

export default {
    title: 'TodoList/Task',
    component: Task
} as Meta;

const removeTaskCallback = action('Remove button inside Task clicked');
const changeStatusTaskCallback = action('Status changed inside Task');
const changeTitleTaskCallback = action('Title changed inside Task');

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    changeTaskStatus: changeStatusTaskCallback,
    changeTaskTitle: changeTitleTaskCallback,
    removeTask: removeTaskCallback,
    task: {id: '1', isDone: true, title: 'React'},
    todoListId: 'todoList'
}

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    changeTaskStatus: changeStatusTaskCallback,
    changeTaskTitle: changeTitleTaskCallback,
    removeTask: removeTaskCallback,
    task: {id: '2', isDone: false, title: 'HTML'},
    todoListId: 'todoList'
}



