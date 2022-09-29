import React, { useEffect, useState } from "react";
import {
  BoardAssignModal,
  BoardAssignTo,
  BoardAssignInfoTask,
  BoardAssignClose,
  BoardAssignApply,
  BoardAssignAssignToMe,
} from "./BoardAssign.style";

// Biến user hiện tại
const myUser = {
  id: 4,
  name: "Hoang Huu Dong",
  email: "hdongqt@example.com",
};

const BoardAssign = ({
  taskAssign,
  handleChangeAssignment,
  setTaskOnAssign,
}) => {
  const listUsers = [
    {
      id: 1,
      name: "Johnss",
      email: "johndoe@example.com",
    },
    {
      id: 2,
      name: "Alice",
      email: "alice@example.com",
    },
    {
      id: 3,
      name: "Microsoft",
      email: "micoskdo@example.com",
    },
    {
      id: 4,
      name: "Hoang Huu Dong",
      email: "hdongqt@example.com",
    },
  ];

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
      <BoardAssignAssignToMe onClick={() => onClickAssignToMe()}>
        Assign to me
      </BoardAssignAssignToMe>
      <BoardAssignClose onClick={() => setTaskOnAssign(null)}>
        X
      </BoardAssignClose>
    </BoardAssignModal>
  );
};

export default BoardAssign;
