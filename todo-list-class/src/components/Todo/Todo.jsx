import React, { PureComponent } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import { TYPE_FILTER } from '../../utils/typeFilter';
import TodoList from './../TodoList/TodoList';
import * as TODO from './Todo.style';

export default class Todo extends PureComponent {
  state = {
    listTodo: [],
    todoEdit: null,
    filter: TYPE_FILTER.ALL,
  };

  handelRandomId = () => {
    const id = Math.floor(Math.random() * 1000) + 1;
    if (this.state.listTodo.find((todo) => todo.id === id)) {
      return this.handelRandomId();
    } else {
      return id;
    }
  };

  addTodo = (title) => {
    const todo = {
      id: this.handelRandomId(),
      title: title,
      done: false,
    };
    this.setState({
      listTodo: [...this.state.listTodo, todo],
    });
  };

  onClickDoneTodo = (id) => {
    let { listTodo } = this.state;
    const indexTodo = listTodo.findIndex((todo) => todo.id === id);
    listTodo = [
      ...listTodo.slice(0, indexTodo),
      { ...listTodo[indexTodo], done: !listTodo[indexTodo].done },
      ...listTodo.slice(indexTodo + 1),
    ];
    this.setState({
      listTodo: listTodo,
    });
  };

  onClickDeleteTodo = (id) => {
    let { listTodo } = this.state;
    const indexTodo = listTodo.findIndex((todo) => todo.id === id);
    listTodo = [...listTodo.slice(0, indexTodo), ...listTodo.slice(indexTodo + 1)];
    this.setState({
      listTodo: listTodo,
    });
  };

  onClickEditTodo = (todo) => {
    this.setState({
      todoEdit: todo,
    });
  };

  clearEditTodo = () => {
    this.setState({
      todoEdit: null,
    });
  };

  handelEditTodo = (todo) => {
    let { listTodo } = this.state;
    const indexTodo = listTodo.findIndex((item) => item.id === todo.id);
    listTodo = [...listTodo.slice(0, indexTodo), todo, ...listTodo.slice(indexTodo + 1)];
    this.setState({
      listTodo: listTodo,
      todoEdit: null,
    });
  };

  handelFilter = () => {
    const { listTodo, filter } = this.state;
    switch (filter) {
      case TYPE_FILTER.COMPLETE:
        return listTodo.filter((todo) => todo.done === true);
      case TYPE_FILTER.INPROGRESS:
        return listTodo.filter((todo) => todo.done === false);
      default:
        return listTodo;
    }
  };

  render() {
    return (
      <TODO.TodoContainer>
        <TODO.TodoHeader>Todo List</TODO.TodoHeader>
        <AddTodo
          addTodo={this.addTodo}
          todoEdit={this.state.todoEdit}
          clearEditTodo={this.clearEditTodo}
          handelEditTodo={this.handelEditTodo}
        />
        <TodoList
          todoList={this.handelFilter()}
          onClickDoneTodo={this.onClickDoneTodo}
          onClickDeleteTodo={this.onClickDeleteTodo}
          onClickEditTodo={this.onClickEditTodo}
        />
        <TODO.FilterTodoStyle>
          {Object.values(TYPE_FILTER).map((value, index) => {
            return (
              <TODO.FilterButton
                key={index}
                className={this.state.filter === value && 'filter--active'}
                onClick={() => this.setState({ filter: value })}
              >
                {value}
              </TODO.FilterButton>
            );
          })}
        </TODO.FilterTodoStyle>
      </TODO.TodoContainer>
    );
  }
}
