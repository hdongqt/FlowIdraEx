import React, { useState, useEffect } from "react";
import { listUsers, myUser } from "../../utils/user";
import Swal from "sweetalert2";

import {
  FormOverlay,
  BoardForm,
  FormGroup,
  FormLabel,
  TextInput,
  TextArea,
  FormSelect,
  FormAssignToMe,
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
    assigneeId: -1,
  });

  useEffect(() => {
    if (taskEdit) {
      setFormData({
        title: taskEdit.title,
        description: taskEdit.description,
        assigneeId: taskEdit.assignee.id,
      });
    }
  }, [taskEdit]);

  const [messageError, setMessageError] = useState({
    title: "",
    description: "",
    assignee: "",
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
    if (formData.assigneeId < -1) {
      error = { ...error, assignee: "Assignee is not valid !" };
    }
    //action
    if (Object.values(error).find((task) => task.length > 0)) {
      setMessageError(error);
    } else {
      handleOnSubmit();
    }
  };

  const handleOnSubmit = () => {
    let form = {
      title: formData.title,
      description: formData.description,
    };
    if (taskEdit) {
      form = { ...taskEdit, ...form };
    } else {
      const idAssignee = +formData.assigneeId;
      const assigneeFind =
        listUsers.find((user) => user.id === idAssignee) || {};
      form = { ...form, assignee: assigneeFind };
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
    setFormData({ title: "", description: "", assigneeId: -1 });
    setMessageError({ title: "", description: "", assignee: "" });
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
        {!taskEdit && (
          <FormGroup className="form-group">
            <FormLabel>Assignee</FormLabel>
            <FormSelect
              name="assigneeId"
              value={formData.assigneeId ? formData.assigneeId : -1}
              onChange={(e) => {
                onChangeInput(e);
              }}
            >
              <option value={-1}>Unassigned</option>
              {listUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </FormSelect>
            {messageError.assignee && (
              <FormMessageError>{messageError.assignee}</FormMessageError>
            )}
            <FormAssignToMe
              onClick={() =>
                setFormData({ ...formData, assigneeId: myUser.id })
              }
            >
              Assign to me
            </FormAssignToMe>
          </FormGroup>
        )}
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
