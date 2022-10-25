import React, { useEffect } from "react";
import Swal from "sweetalert2";
import * as LIST from "./TodoList.style";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, selectEditTodo, editTodoFilter, getListTodo } from "../../containers/Todo/todoSlice";
import { TYPE_FILTER } from "../../utils/typeFilter";

const TodoList = () => {
  const filter = useSelector((state) => state.todos.filter);
  const isLoading = useSelector((state) => state.todos.loadingFetchTodo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListTodo());
  }, [dispatch]);

  const todoLists = useSelector((state) =>
    filter === TYPE_FILTER.ALL
      ? state.todos.todoList
      : filter === TYPE_FILTER.COMPLETE
      ? state.todos.todoList.filter((task) => task.is_done)
      : state.todos.todoList.filter((task) => !task.is_done)
  );
  const handleDeleteTodo = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTodo(id));
      }
    });
  };

  const handleChangeStatus = (status, todo) => {
    const newTodo = { ...todo, is_done: status };
    dispatch(editTodoFilter(newTodo));
  };

  return (
    <LIST.TodoListStyle>
      {isLoading ? (
        <LIST.LoadingIcon>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831"
            alt="loading"
          ></img>
        </LIST.LoadingIcon>
      ) : todoLists && todoLists.length ? (
        todoLists.map((todo, index) => {
          return (
            <LIST.TodoItem key={index}>
              <LIST.TodoCheckInput
                type="checkbox"
                checked={todo.is_done}
                onChange={(e) => handleChangeStatus(e.target.checked, todo)}
              ></LIST.TodoCheckInput>
              <LIST.TodoText donTask={todo.done}>{todo.title}</LIST.TodoText>
              <LIST.TodoGroupButton>
                <LIST.TodoItemButton colorIcon="#1434A4" onClick={() => dispatch(selectEditTodo(todo))}>
                  <i className="las la-edit"></i>
                </LIST.TodoItemButton>
                <LIST.TodoItemButton colorIcon="#FF0000" onClick={() => handleDeleteTodo(todo.id)}>
                  <i className="las la-trash"></i>
                </LIST.TodoItemButton>
              </LIST.TodoGroupButton>
            </LIST.TodoItem>
          );
        })
      ) : (
        <LIST.TodoNoTask>No task 😀</LIST.TodoNoTask>
      )}
    </LIST.TodoListStyle>
  );
};

export default TodoList;
