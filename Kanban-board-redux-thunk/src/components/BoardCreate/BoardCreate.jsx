import React, { useState } from "react";
import { listTypeIssue, listTypePriority, TYPE_STATUS } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, submitFormCreate } from "../../actions/boardAction";
import { find } from "lodash";
import {
  FormOverlay,
  BoardForm,
  FormGroup,
  FormLabel,
  TextInput,
  TextArea,
  FormAssignToMe,
  FormButton,
  FormMessageError,
} from "./BoardCreate.style";
import { useEffect } from "react";
import SelectCustom from "../SelectCustom/SelectCustom";

const getListSelectUsers = (list) => {
  return list.map((user) => ({
    label: user.fullname,
    value: user.id,
  }));
};

const BoardCreate = ({ setIsOpenFormCreate }) => {
  const dispatch = useDispatch();
  const listTask = useSelector((state) => state.boardReducer.listTask);
  const listUsers = useSelector((state) => state.boardReducer.listUser);
  const myUser = useSelector((state) => state.boardReducer.myUser);
  const [listUserOptions, setListUserOptions] = useState([]);

  useEffect(() => {
    dispatch(getUsers());
    setFormData({
      title: "",
      description: "",
      assignee_id: 1,
      issue_type: "TASK",
      priority_type: "MEDIUM",
    });
    setMessageError({
      title: "",
      description: "",
      assignee: "",
      issue_type: "",
      priority_type: "",
    });
  }, [dispatch]);

  useEffect(() => {
    if (listUsers.length > 0) {
      setListUserOptions(getListSelectUsers(listUsers));
    }
  }, [listUsers]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee_id: "1",
    issue_type: "TASK",
    priority_type: "MEDIUM",
  });
  const [messageError, setMessageError] = useState({
    title: "",
    description: "",
    assignee_id: "",
    issue_type: "",
    priority_type: "",
  });

  const handleRandomId = () => {
    const id = Math.floor(Math.random() * 1000) + 1;
    if (find(listTask, (task) => task.id === id)) {
      return handleRandomId();
    } else {
      return id;
    }
  };

  const onChangeInput = (e) => {
    const value = typeof e.target.value === "string" ? e.target.value : +e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
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
    if (!formData.priority_type) {
      error = { ...error, priority_type: "Priority is not valid !" };
    }
    if (!formData.issue_type) {
      error = { ...error, issue_type: "Type Issue is not valid !" };
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
      ...formData,
      id: handleRandomId(),
      task_status: TYPE_STATUS.BACKLOG,
      reporter_id: myUser.id,
    };
    dispatch(submitFormCreate(form));
    setIsOpenFormCreate(false);
  };

  return (
    <FormOverlay onClick={(e) => setIsOpenFormCreate(false)}>
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
          <div style={{ flex: 1 }}>
            <SelectCustom
              name="issue_type"
              useIcon={true}
              list={listTypeIssue}
              selectValue={formData?.issue_type}
              onChange={onChangeInput}
            />
          </div>
          {messageError.issue_type && <FormMessageError>{messageError.issue_type}</FormMessageError>}
        </FormGroup>
        <FormGroup className="form-group">
          <FormLabel>Priority</FormLabel>
          <SelectCustom
            name="priority_type"
            useIcon={true}
            list={listTypePriority}
            selectValue={formData?.priority_type}
            onChange={onChangeInput}
          />
          {messageError.priority_type && <FormMessageError>{messageError.priority_type}</FormMessageError>}
        </FormGroup>
        <FormGroup className="form-group">
          <FormLabel>Assignee</FormLabel>
          <SelectCustom
            name="assignee_id"
            list={listUserOptions}
            selectValue={formData?.assignee_id}
            onChange={onChangeInput}
          />
          {messageError.assignee_id && <FormMessageError>{messageError.assignee_id}</FormMessageError>}
          <FormAssignToMe onClick={() => setFormData({ ...formData, assignee_id: myUser.id })}>
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
            Create
          </FormButton>
          <FormButton type="button" onClick={() => setIsOpenFormCreate(false)}>
            Cancel
          </FormButton>
        </FormGroup>
      </BoardForm>
    </FormOverlay>
  );
};

export default BoardCreate;
