import AddTodo from "../../components/AddTodo/AddTodo";
import { TYPE_FILTER } from "../../utils/typeFilter";
import TodoList from "../../components/TodoList/TodoList";
import * as TODO from "./Todo.style";
import { useSelector, useDispatch } from "react-redux";
import { changeFilter } from "./todoSlice";
import { useEffect } from "react";
import { getListTodo } from "../../containers/Todo/todoSlice";

const Todo = () => {
  const filter = useSelector((state) => state.todos.filter);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListTodo());
  }, [dispatch]);

  return (
    <TODO.TodoContainer>
      <TODO.TodoHeader>Todo List</TODO.TodoHeader>
      <AddTodo />
      <TodoList />
      <TODO.FilterTodoStyle>
        {Object.values(TYPE_FILTER).map((value, index) => {
          return (
            <TODO.FilterButton
              key={index}
              className={filter === value && "filter--active"}
              onClick={() => dispatch(changeFilter(value))}
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
