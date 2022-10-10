import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { find } from "lodash";
import { listTypeIssue, listTypePriority } from "../../utils/typeTask";
import { listUsers, myUser } from "../../utils/user";
import { setEditTask, submitFormEdit } from "../../actions/boardAction";
import {
  BoardInfoModal,
  BoardInfoForm,
  BoardInfoTo,
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

const BoardInfo = () => {
  const dispatch = useDispatch();
  const taskEdit = useSelector((state) => state.boardReducer.taskEditSelected);
  const [formData, setFormData] = useState(null);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [messageError, setMessageError] = useState({
    title: "",
    description: "",
    assignee: "",
    typeIssue: "",
    priority: "",
  });
  useEffect(() => setFormData(taskEdit), [taskEdit]);

  const onChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    setMessageError({ ...messageError, [e.target.name]: "" });
  };

  const onChangeAssignee = (id) => {
    setMessageError({ ...messageError, assignee: "" });
    if (id > -1) {
      const findTask = find(listUsers, (user) => user.id === id);
      setFormData({ ...formData, assignee: findTask });
    } else {
      setFormData({ ...formData, assignee: {} });
    }
  };

  const onClickAssignToMe = () => {
    setFormData({ ...formData, assignee: myUser });
  };

  const handleCloseForm = () => {
    dispatch(setEditTask(null));
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
      dispatch(submitFormEdit(formData));
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
                    value={formData.title}
                    name="title"
                    onChange={(e) => onChangeInput(e)}
                    autoFocus={true}
                    onBlur={(e) => setIsEditTitle(false)}
                  ></BoardInfoTaskTitleInput>
                </>
              ) : (
                <BoardInfoTaskTitle onClick={() => setIsEditTitle(true)}>{formData.title}</BoardInfoTaskTitle>
              )}
              {messageError.title && <FormMessageError>{messageError.title}</FormMessageError>}
            </BoardInfoInfoTask>
            <FormInfoMain>
              <h4>Details</h4>
              <FormInfoGroup>
                <FormInfoItem>
                  <label>Status:</label>
                  <span>{formData.status}</span>
                </FormInfoItem>
              </FormInfoGroup>
              <FormInfoGroup>
                <FormInfoItem>
                  <label>Type Issue:</label>
                  <BoardInfoTo>
                    <select value={formData.typeIssue} onChange={(e) => onChangeInput(e)} name="typeIssue">
                      {listTypeIssue.map((item) => (
                        <option key={item.type} value={item.type}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </BoardInfoTo>
                </FormInfoItem>
                {messageError.typeIssue && <FormMessageError>{messageError.typeIssue}</FormMessageError>}
              </FormInfoGroup>
              <FormInfoGroup>
                <FormInfoItem>
                  <label>Priority:</label>
                  <BoardInfoTo>
                    <select value={formData?.priority} onChange={(e) => onChangeInput(e)} name="priority">
                      {listTypePriority.map((item) => (
                        <option key={item.type} value={item.type}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </BoardInfoTo>
                </FormInfoItem>
                {messageError.priority && <FormMessageError>{messageError.priority}</FormMessageError>}
              </FormInfoGroup>
              <h4>People</h4>
              <FormInfoGroup>
                <FormInfoItem>
                  <label>Reporter:</label>
                  <span>Hoang Huu Dong</span>
                </FormInfoItem>
              </FormInfoGroup>
              <FormInfoGroup>
                <FormInfoItem>
                  <label>Assignee:</label>
                  <BoardInfoTo>
                    <select
                      value={formData && formData.assignee.id ? formData.assignee.id : -1}
                      onChange={(e) => onChangeAssignee(+e.target.value)}
                    >
                      <option value={-1}>Unassigned</option>
                      {listUsers.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </BoardInfoTo>
                </FormInfoItem>
              </FormInfoGroup>
              <FormInfoGroup>
                <div>
                  {taskEdit && myUser.email !== taskEdit.assignee.email && (
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
                  value={formData.description}
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
