import React from 'react';
import * as LIST from './TodoList.style';

const TodoList = ({ todoList, onClickDoneTodo, onClickDeleteTodo, onClickEditTodo }) => {
  return (
    <LIST.TodoListStyle>
      {todoList &&
        todoList.map((todo, index) => {
          return (
            <LIST.TodoItem key={index}>
              <LIST.TodoCheckInput
                type="checkbox"
                checked={todo.done}
                onChange={() => onClickDoneTodo(todo.id)}
              ></LIST.TodoCheckInput>
              <LIST.TodoText donTask={todo.done}>{todo.title}</LIST.TodoText>
              <LIST.TodoGroupButton>
                <LIST.TodoItemButton colorIcon="#1434A4" onClick={() => onClickEditTodo(todo)}>
                  <i className="las la-edit"></i>
                </LIST.TodoItemButton>
                <LIST.TodoItemButton colorIcon="#FF0000" onClick={() => onClickDeleteTodo(todo.id)}>
                  <i className="las la-trash"></i>
                </LIST.TodoItemButton>
              </LIST.TodoGroupButton>
            </LIST.TodoItem>
          );
        })}
      {!todoList.length && <LIST.TodoNoTask>No task 😀</LIST.TodoNoTask>}
    </LIST.TodoListStyle>
  );
};

export default TodoList;
