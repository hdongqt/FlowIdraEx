import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import {
  FormOverlay,
  BoardForm,
  FormGroup,
  FormLabel,
  TextInput,
  TextArea,
  FormButton,
  FormMessageError,
  FormIconLoader,
} from "./BoardForm.style";

const BoardFrom = ({
  isOpenForm,
  handleCloseForm,
  taskEdit,
  handleCreateOrEditTask,
  isLoadingForm,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (taskEdit) {
      setFormData({ title: taskEdit.title, description: taskEdit.description });
    }
  }, [taskEdit]);

  const [messageError, setMessageError] = useState({
    title: "",
    description: "",
  });

  const onChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    setMessageError({ ...messageError, [e.target.name]: "" });
  };

  const onClickCreateForm = (e) => {
    e.preventDefault();
    //validate
    let error = messageError;
    if (!formData.title) {
      error = { ...error, title: "Title is required !" };
    }
    if (!formData.description) {
      error = { ...error, description: "Description is required !" };
    }
    //action
    if (Object.values(error).find((task) => task.length > 0)) {
      setMessageError(error);
    } else {
      handleOnSubmit();
    }
  };

  const handleOnSubmit = () => {
    let form = formData;
    if (taskEdit) {
      form = { ...taskEdit, ...form };
    }
    handleCreateOrEditTask(form).then((mess) => {
      onClickCloseForm();
      Swal.fire({
        position: "center",
        icon: "success",
        title: mess || "Save successfully !",
        showConfirmButton: false,
        timer: 1000,
      });
    });
  };

  const onClickCloseForm = () => {
    setFormData({ title: "", description: "" });
    handleCloseForm();
  };

  return (
    <FormOverlay isOpen={isOpenForm} onClick={(e) => onClickCloseForm()}>
      <BoardForm onClick={(e) => e.stopPropagation()}>
        <h3> {taskEdit ? "Edit Task" : "Create Task"}</h3>
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
          {messageError.title && (
            <FormMessageError>{messageError.title}</FormMessageError>
          )}
        </FormGroup>
        <FormGroup className="form-group">
          <FormLabel>Description</FormLabel>
          <TextArea
            rows={10}
            placeholder="Please enter description"
            name="description"
            value={formData.description}
            onChange={(e) => {
              onChangeInput(e);
            }}
          />
          {messageError.description && (
            <FormMessageError>{messageError.description}</FormMessageError>
          )}
        </FormGroup>
        <FormGroup className="form-group form-group-btn">
          <FormButton
            type="submit"
            isSubmit={true}
            onClick={(e) => {
              onClickCreateForm(e);
            }}
          >
            {isLoadingForm && (
              <FormIconLoader>
                <i className="las la-spinner"></i>
              </FormIconLoader>
            )}
            {taskEdit ? "Edit" : "Create"}
          </FormButton>
          <FormButton type="button" onClick={() => onClickCloseForm()}>
            Cancel
          </FormButton>
        </FormGroup>
      </BoardForm>
    </FormOverlay>
  );
};

export default BoardFrom;
