import React from 'react';
import {Story} from '@storybook/react/types-6-0';
import {action} from '@storybook/addon-actions';
import {Task, TaskPropsType} from './Task';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';

const removeTaskCallback = action('Remove button inside Task clicked');
const changeStatusTaskCallback = action('Status changed inside Task');
const changeTitleTaskCallback = action('Title changed inside Task');

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    changeTaskStatus: changeStatusTaskCallback,
    changeTaskTitle: changeTitleTaskCallback,
    removeTask: removeTaskCallback,
    task: {id: '1', status: TaskStatuses.Completed, title: 'React', description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todoListId1', order: 0, addedDate: ''},
    todoListId: 'todoListId1'
}

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    changeTaskStatus: changeStatusTaskCallback,
    changeTaskTitle: changeTitleTaskCallback,
    removeTask: removeTaskCallback,
    task: {id: '2', status: TaskStatuses.New, title: 'HTML', description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todoListId2', order: 0, addedDate: ''},
    todoListId: 'todoListId2'
}



