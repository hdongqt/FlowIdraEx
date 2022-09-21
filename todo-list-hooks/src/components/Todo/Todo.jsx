import React, { useState } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import { TYPE_FILTER } from '../../utils/typeFilter';
import TodoList from './../TodoList/TodoList';
import * as TODO from './Todo.style';

const Todo = () => {
  const [listTodo, setListTodo] = useState([]);
  const [todoEdit, setTodoEdit] = useState(null);
  const [filter, setFilter] = useState(TYPE_FILTER.ALL);

  const handelRandomId = () => {
    const id = Math.floor(Math.random() * 1000) + 1;
    if (listTodo.find((todo) => todo.id === id)) {
      return handelRandomId();
    } else {
      return id;
    }
  };

  const addTodo = (title) => {
    const todo = {
      id: handelRandomId(),
      title: title,
      done: false,
    };
    setListTodo([...listTodo, todo]);
  };

  const onClickDoneTodo = (id) => {
    const indexTodo = listTodo.findIndex((todo) => todo.id === id);
    const newListTodo = [
      ...listTodo.slice(0, indexTodo),
      { ...listTodo[indexTodo], done: !listTodo[indexTodo].done },
      ...listTodo.slice(indexTodo + 1),
    ];
    setListTodo(newListTodo);
  };

  const onClickDeleteTodo = (id) => {
    const indexTodo = listTodo.findIndex((todo) => todo.id === id);
    const newListTodo = [...listTodo.slice(0, indexTodo), ...listTodo.slice(indexTodo + 1)];
    setListTodo(newListTodo);
  };

  const onClickEditTodo = (todo) => {
    setTodoEdit(todo);
  };

  const clearEditTodo = () => {
    setTodoEdit(null);
  };

  const handelEditTodo = (todo) => {
    const indexTodo = listTodo.findIndex((item) => item.id === todo.id);
    const newListTodo = [...listTodo.slice(0, indexTodo), todo, ...listTodo.slice(indexTodo + 1)];
    setListTodo(newListTodo);
    setTodoEdit(null);
  };

  const handelFilter = () => {
    switch (filter) {
      case TYPE_FILTER.COMPLETE:
        return listTodo.filter((todo) => todo.done === true);
      case TYPE_FILTER.INPROGRESS:
        return listTodo.filter((todo) => todo.done === false);
      default:
        return listTodo;
    }
  };
  return (
    <TODO.TodoContainer>
      <TODO.TodoHeader>Todo List</TODO.TodoHeader>
      <AddTodo addTodo={addTodo} todoEdit={todoEdit} clearEditTodo={clearEditTodo} handelEditTodo={handelEditTodo} />
      <TodoList
        todoList={handelFilter()}
        onClickDoneTodo={onClickDoneTodo}
        onClickDeleteTodo={onClickDeleteTodo}
        onClickEditTodo={onClickEditTodo}
      />
      <TODO.FilterTodoStyle>
        {Object.values(TYPE_FILTER).map((value, index) => {
          return (
            <TODO.FilterButton
              key={index}
              className={filter === value && 'filter--active'}
              onClick={() => setFilter(value)}
            >
              {value}
            </TODO.FilterButton>
          );
        })}
      </TODO.FilterTodoStyle>
    </TODO.TodoContainer>
  );
};

export default Todo;
