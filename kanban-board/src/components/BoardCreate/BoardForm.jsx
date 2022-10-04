import React, { useState } from "react";
import { listUsers, myUser } from "../../utils/user";
import Swal from "sweetalert2";
import { listTypeIssue, listTypePriority } from "../../utils/typeTask";

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

const BoardFrom = ({ isOpenForm, handleCloseForm, handleCreateTask }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assigneeId: -1,
    typeIssue: "TASK",
    priority: "MEDIUM",
  });

  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [messageError, setMessageError] = useState({
    title: "",
    description: "",
    assignee: "",
    typeIssue: "",
    priority: "",
  });

  const onChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    setMessageError({ ...messageError, [e.target.name]: "" });
  };

  const onClickCreateForm = (e) => {
    e.preventDefault();
    //validate
    let error = messageError;
    if (!formData.title || formData.title.length > 100) {
      error = { ...error, title: "Title is required and less than 100 characters!" };
    }
    if (!formData.description) {
      error = { ...error, description: "Description is required !" };
    }
    if (formData.assigneeId < -1) {
      error = { ...error, assignee: "Assignee is not valid !" };
    }
    if (!formData.priority) {
      error = { ...error, priority: "Priority is not valid !" };
    }
    if (!formData.typeIssue) {
      error = { ...error, typeIssue: "Type Issue is not valid !" };
    }
    //action
    if (Object.values(error).find((task) => task.length > 0)) {
      setMessageError(error);
    } else {
      handleOnSubmit();
    }
  };

  const handleOnSubmit = () => {
    setIsLoadingForm(true);
    const { assigneeId, ...params } = formData;
    const idAssignee = +formData.assigneeId;
    const assigneeFind = listUsers.find((user) => user.id === idAssignee) || {};
    let form = { ...params, assignee: assigneeFind, reporter: myUser };
    handleCreateTask(form).then((mess) => {
      setIsLoadingForm(false);
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
    setFormData({
      title: "",
      description: "",
      assigneeId: -1,
      typeIssue: "TASK",
      priority: "MEDIUM",
    });
    setMessageError({
      title: "",
      description: "",
      assignee: "",
      typeIssue: "",
      priority: "",
    });
    handleCloseForm();
  };

  return (
    <FormOverlay isOpen={isOpenForm} onClick={(e) => onClickCloseForm()}>
      <BoardForm onClick={(e) => e.stopPropagation()}>
        <h3> Create Task</h3>
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
          <TextArea
            rows={6}
            placeholder="Please enter description"
            name="description"
            value={formData.description}
            onChange={(e) => {
              onChangeInput(e);
            }}
          />
          {messageError.description && <FormMessageError>{messageError.description}</FormMessageError>}
        </FormGroup>
        <FormGroup className="form-group">
          <FormLabel>Issue Type</FormLabel>
          <FormSelect
            name="typeIssue"
            value={formData.typeIssue}
            onChange={(e) => {
              onChangeInput(e);
            }}
          >
            {listTypeIssue.map((item) => (
              <option key={item.type} value={item.type}>
                {item.name}
              </option>
            ))}
          </FormSelect>
          {messageError.typeIssue && <FormMessageError>{messageError.typeIssue}</FormMessageError>}
        </FormGroup>
        <FormGroup className="form-group">
          <FormLabel>Priority</FormLabel>
          <FormSelect
            name="priority"
            value={formData.priority}
            onChange={(e) => {
              onChangeInput(e);
            }}
          >
            {listTypePriority.map((item) => (
              <option key={item.type} value={item.type}>
                {item.name}
              </option>
            ))}
          </FormSelect>
          {messageError.priority && <FormMessageError>{messageError.priority}</FormMessageError>}
        </FormGroup>
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
          {messageError.assignee && <FormMessageError>{messageError.assignee}</FormMessageError>}
          <FormAssignToMe onClick={() => setFormData({ ...formData, assigneeId: myUser.id })}>
            Assign to me
          </FormAssignToMe>
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
            Create
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
