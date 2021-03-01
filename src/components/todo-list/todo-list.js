import React from 'react';
import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({
  todos, onDeleted,
  onToggleImportant,
  onToggleDone }) => {

  const element = todos.map((item) => {

    const { id, ...itemProps } = item;

    return (
      <li key={id} className='list-group-item'>
        <TodoListItem
          // spread operator
        {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)} />
      </li>
    )
  })

  return (
    <ul className='list-group todo-list'>
      { element }
    </ul>
  );
};

export default TodoList;