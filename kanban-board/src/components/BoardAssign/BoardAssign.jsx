import React, { useEffect, useState } from "react";
import { listUsers, myUser } from "../../utils/user";
import {
  BoardAssignModal,
  BoardAssignTo,
  BoardAssignInfoTask,
  BoardAssignClose,
  BoardAssignApply,
  BoardAssignAssignToMe,
} from "./BoardAssign.style";

const BoardAssign = ({
  taskAssign,
  handleChangeAssignment,
  setTaskOnAssign,
}) => {
  const [taskAssignSelected, setTaskAssignSelected] = useState(null);

  useEffect(() => {
    setTaskAssignSelected(taskAssign);
  }, [taskAssign]);
  const onChangeAssign = (id) => {
    const userAssignSelected = listUsers.find((user) => user.id === id);
    const taskChange = {
      ...taskAssignSelected,
      assignee: userAssignSelected ? userAssignSelected : {},
    };
    setTaskAssignSelected(taskChange);
  };

  const onClickChangeApply = () => {
    handleChangeAssignment(taskAssignSelected);
  };

  const onClickAssignToMe = () => {
    const taskChange = {
      ...taskAssignSelected,
      assignee: myUser ? myUser : {},
    };
    handleChangeAssignment(taskChange);
  };

  return (
    <BoardAssignModal isOpen={taskAssignSelected}>
      <BoardAssignInfoTask>
        <h3>{taskAssign && taskAssign.title}</h3>
        <p>{taskAssign && taskAssign.description}</p>
        <p>Status: {taskAssign && taskAssign.status}</p>
      </BoardAssignInfoTask>
      <BoardAssignTo>
        <span>Assign to:</span>
        <select
          value={
            taskAssignSelected && taskAssignSelected.assignee.id
              ? taskAssignSelected.assignee.id
              : -1
          }
          onChange={(e) => {
            onChangeAssign(+e.target.value);
          }}
        >
          <option value={-1}>Unassigned</option>
          {listUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <BoardAssignApply onClick={() => onClickChangeApply()}>
          <i className="las la-check"></i>
        </BoardAssignApply>
      </BoardAssignTo>
      {taskAssign && myUser.email !== taskAssign.assignee.email && (
        <BoardAssignAssignToMe gnAssignToMe onClick={() => onClickAssignToMe()}>
          Assign to me
        </BoardAssignAssignToMe>
      )}
      <BoardAssignClose onClick={() => setTaskOnAssign(null)}>
        X
      </BoardAssignClose>
    </BoardAssignModal>
  );
};

export default BoardAssign;
