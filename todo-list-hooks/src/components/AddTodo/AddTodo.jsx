import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import * as ADD from './AddTodo.style';

const AddTodo = ({ handelEditTodo, addTodo, clearEditTodo, todoEdit }) => {
  const [title, setTitle] = useState('');
  const [todoEditSelected, setTodoEditSelected] = useState(null);

  useEffect(() => {
    if (todoEdit) {
      setTodoEditSelected(todoEdit);
      setTitle(todoEdit.title);
    }
  }, [todoEdit]);

  const onChangeInput = (event) => {
    setTitle(event.target.value);
  };

  const handelClickAddEditTodo = () => {
    if (title) {
      if (todoEditSelected) {
        const todo = { ...todoEditSelected, title: title };
        handelEditTodo(todo);
        setTitle('');
        setTodoEditSelected(null);
      } else {
        addTodo(title);
        setTitle('');
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a title for the task !',
      });
    }
  };

  const onClickClearEdit = () => {
    clearEditTodo();
    setTitle('');
    setTodoEditSelected(null);
  };

  return (
    <ADD.AddTodoStyle>
      <ADD.AddTodoInput
        placeholder="Please enter a title for the task..."
        onChange={(e) => onChangeInput(e)}
        value={title}
      ></ADD.AddTodoInput>
      {todoEditSelected && (
        <ADD.ClearEditButton onClick={() => onClickClearEdit()}>
          <i className="las la-redo-alt"></i>
        </ADD.ClearEditButton>
      )}
      <ADD.AddTodoButton onClick={() => handelClickAddEditTodo()}>{todoEdit ? 'Edit' : 'Add'}</ADD.AddTodoButton>
    </ADD.AddTodoStyle>
  );
};

export default AddTodo;
