import React, { useState, useEffect } from 'react';
import {
  FormOverlay,
  BoardForm,
  FormGroup,
  FormLabel,
  TextInput,
  FormButton,
  FormMessageError,
} from './BoardForm.style';

const BoardFrom = ({ isOpenForm, handelCloseForm, handelCreateTask, taskEdit, handelEditTask }) => {
  useEffect(() => {
    if (taskEdit) {
      const { title, description } = taskEdit;
      setFormData({ title, description });
    } else {
      setFormData({ title: '', description: '' });
    }
  }, [taskEdit]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const [messageError, setMessageError] = useState({
    title: '',
    description: '',
  });

  const onChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    setMessageError({ ...messageError, [e.target.name]: '' });
  };

  const onClickCreateForm = (e) => {
    e.preventDefault();
    //validate
    let error = messageError;
    if (!formData.title) {
      error = { ...error, title: 'Title is required !' };
    }
    if (!formData.description) {
      error = { ...error, description: 'Description is required !' };
    }
    //action
    if (Object.values(error).find((task) => task.length > 0)) {
      setMessageError(error);
    } else {
      //check: edit task
      if (taskEdit) {
        handelEditTask({ ...taskEdit, ...formData });
      } else {
        handelCreateTask(formData);
      }
      //reset form
      setFormData({ title: '', description: '' });
      handelCloseForm();
    }
  };

  return (
    <FormOverlay isOpen={isOpenForm} onClick={(e) => handelCloseForm()}>
      <BoardForm onClick={(e) => e.stopPropagation()}>
        <h3>Create Task</h3>
        <FormGroup className="form-group">
          <FormLabel>Title</FormLabel>
          <TextInput
            type="text"
            placeholder="Please enter title"
            name="title"
            value={formData.title}
            onChange={(e) => {
              onChangeInput(e);
            }}
          />
          {messageError.title && <FormMessageError>{messageError.title}</FormMessageError>}
        </FormGroup>
        <FormGroup className="form-group">
          <FormLabel>Description</FormLabel>
          <TextInput
            type="text"
            placeholder="Please enter description"
            name="description"
            value={formData.description}
            onChange={(e) => {
              onChangeInput(e);
            }}
          />
          {messageError.description && <FormMessageError>{messageError.description}</FormMessageError>}
        </FormGroup>
        <FormGroup className="form-group form-group-btn">
          <FormButton
            type="submit"
            onClick={(e) => {
              onClickCreateForm(e);
            }}
          >
            {taskEdit ? 'Edit' : 'Create'}
          </FormButton>
          <FormButton type="button" onClick={() => handelCloseForm()}>
            Cancel
          </FormButton>
        </FormGroup>
      </BoardForm>
    </FormOverlay>
  );
};

export default BoardFrom;
