import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTypeIssue, listTypePriority } from "../../utils";
import { getTasks, submitFormEdit } from "../../actions/boardAction";
import { useLocation } from "react-router-dom";
import {
  BoardInfoModal,
  BoardInfoForm,
  BoardInfoInfoTask,
  BoardInfoClose,
  BoardInfoAssignToMe,
  FormInfoMain,
  FormInfoItem,
  BoardInfoTaskTitleInput,
  BoardInfoTaskTitle,
  FormInfoTextArea,
  FormInfoGroup,
  FormInfoGroupButton,
  FormInfoButton,
  FormMessageError,
} from "./BoardInfo.style";
import SelectUseIcon from "../../components/SelectCustom/SelectCustom";
import { SET_EDIT_TASK_FULFILLED } from "../../constants/actionType";

const getListSelectUsers = (list) => {
  return list.map((user) => ({
    label: user.fullname,
    value: user.id,
  }));
};

const BoardInfo = () => {
  const dispatch = useDispatch();
  const taskEdit = useSelector((state) => state.boardReducer.taskEditSelected);
  const listUsers = useSelector((state) => state.boardReducer.listUser);
  const [listUserOptions, setListUserOptions] = useState([]);
  const myUser = listUsers[1];
  const [formData, setFormData] = useState(null);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const { pathname } = useLocation();

  const [messageError, setMessageError] = useState({
    title: "",
    description: "",
    assignee_id: "",
    issue_type: "",
    priority_type: "",
  });

  useEffect(() => {
    if (taskEdit) {
      const { title, description, task_status, issue_type, priority_type, assignee_id } = taskEdit;
      setFormData({ title, description, task_status, issue_type, priority_type, assignee_id });
    } else {
      setFormData(taskEdit);
    }
  }, [taskEdit]);

  useEffect(() => {
    if (listUsers.length > 0) {
      setListUserOptions(getListSelectUsers(listUsers));
    }
  }, [listUsers]);

  const onChangeInput = (e) => {
    const value = typeof e.target.value === "string" ? e.target.value.trim() : +e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    setMessageError({ ...messageError, [e.target.name]: "" });
  };

  const onClickAssignToMe = () => {
    setFormData({ ...formData, assignee_id: myUser.id });
  };

  const handleCloseForm = () => {
    dispatch({
      type: SET_EDIT_TASK_FULFILLED,
      payload: null,
    });
    setMessageError({ title: "", description: "", assignee: "", typeIssue: "", priority: "" });
  };

  const onSubmitFormInfo = () => {
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
      dispatch(submitFormEdit(taskEdit.id, formData, pathname === "/backlog" ? "backlog" : "active"));
    }
  };

  return (
    <>
      <BoardInfoModal isOpen={formData} onClick={() => handleCloseForm()}></BoardInfoModal>
      <BoardInfoForm isOpen={formData}>
        {formData && (
          <form action="">
            <BoardInfoInfoTask>
              {isEditTitle ? (
                <>
                  <BoardInfoTaskTitleInput
                    type="text"
                    value={formData?.title}
                    name="title"
                    onChange={(e) => onChangeInput(e)}
                    autoFocus={true}
                    onBlur={(e) => setIsEditTitle(false)}
                  />
                </>
              ) : (
                <BoardInfoTaskTitle onClick={() => setIsEditTitle(true)}>{formData?.title}</BoardInfoTaskTitle>
              )}
              {messageError.title && <FormMessageError>{messageError.title}</FormMessageError>}
            </BoardInfoInfoTask>
            <FormInfoMain>
              <h4>Details</h4>
              <FormInfoGroup>
                <FormInfoItem>
                  <label>Status:</label>
                  <span>{formData?.task_status}</span>
                </FormInfoItem>
              </FormInfoGroup>
              <FormInfoGroup>
                <FormInfoItem>
                  <label>Type Issue:</label>
                  <div style={{ flex: 1 }}>
                    <SelectUseIcon
                      useIcon={true}
                      name="issue_type"
                      list={listTypeIssue}
                      selectValue={formData?.issue_type}
                      onChange={onChangeInput}
                    />
                  </div>
                </FormInfoItem>
                {messageError.typeIssue && <FormMessageError>{messageError.typeIssue}</FormMessageError>}
              </FormInfoGroup>
              <FormInfoGroup>
                <FormInfoItem>
                  <label>Priority:</label>
                  <div style={{ flex: 1 }}>
                    <SelectUseIcon
                      name="priority_type"
                      useIcon={true}
                      list={listTypePriority}
                      selectValue={formData?.priority_type}
                      onChange={onChangeInput}
                    />
                  </div>
                </FormInfoItem>
                {messageError.priority && <FormMessageError>{messageError.priority}</FormMessageError>}
              </FormInfoGroup>
              <h4>People</h4>
              <FormInfoGroup>
                <FormInfoItem>
                  <label>Reporter:</label>
                  <span>{formData?.reporter_fullname}</span>
                </FormInfoItem>
              </FormInfoGroup>
              <FormInfoGroup>
                <FormInfoItem>
                  <label>Assignee:</label>
                  <div style={{ flex: 1 }}>
                    <SelectUseIcon
                      name="assignee_id"
                      list={listUserOptions}
                      selectValue={formData?.assignee_id}
                      onChange={onChangeInput}
                    />
                  </div>
                </FormInfoItem>
              </FormInfoGroup>
              <FormInfoGroup>
                <div>
                  {taskEdit && myUser && myUser.id !== formData.assignee_id && (
                    <BoardInfoAssignToMe type="button" onClick={() => onClickAssignToMe()}>
                      Assign to me
                    </BoardInfoAssignToMe>
                  )}
                </div>
                {messageError.assignee && <FormMessageError>{messageError.assignee}</FormMessageError>}
              </FormInfoGroup>
              <FormInfoGroup>
                <h4>Description</h4>
                <FormInfoTextArea
                  name="description"
                  rows={5}
                  onChange={(e) => onChangeInput(e)}
                  value={formData?.description}
                ></FormInfoTextArea>
                {messageError.description && <FormMessageError>{messageError.description}</FormMessageError>}
              </FormInfoGroup>
              <FormInfoGroupButton>
                <FormInfoButton type="button" onClick={() => onSubmitFormInfo()} isSubmit={true}>
                  Save
                </FormInfoButton>
                <FormInfoButton type="button" onClick={() => handleCloseForm()}>
                  Cancle
                </FormInfoButton>
              </FormInfoGroupButton>
            </FormInfoMain>

            <BoardInfoClose type="button" onClick={() => handleCloseForm()}>
              X
            </BoardInfoClose>
          </form>
        )}
      </BoardInfoForm>
    </>
  );
};

export default BoardInfo;
