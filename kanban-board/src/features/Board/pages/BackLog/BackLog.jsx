import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as message from "../../../../utils/message";
import BoardCreate from "../../../../components/BoardCreate/BoardCreate";
import { TYPE_STATUS } from "../../../../utils/typeTask";
import { changeIsOpenFormCreate, changeStatusTask, deleteTask, setEditTask } from "../../../../actions/boardAction";
import {
  BackLogContainer,
  BoardButton,
  BackLogMain,
  BackLogList,
  BackLogItem,
  BackLogItemSendto,
} from "./BackLog.style";

const BackLog = () => {
  const dispatch = useDispatch();
  const listTask = useSelector((state) => state.boardReducer.listTask);
  const [locationOffset, setLocationOffset] = useState({
    top: 0,
    left: 0,
  });
  const [taskSelectRight, setTaskSelectRight] = useState(null);

  const handleOpenForm = () => {
    dispatch(setEditTask(null));
    dispatch(changeIsOpenFormCreate("OPEN"));
  };

  const handleClickItem = (e, taskSelect) => {
    e.preventDefault();
    if (e.type === "contextmenu") {
      setLocationOffset({
        top: e.clientY,
        left: e.clientX,
      });
      setTaskSelectRight(taskSelect);
      const activeElement = document.querySelector(".backlog-sento");
      if (activeElement) activeElement.style.display = "flex";
    } else {
      dispatch(setEditTask(taskSelect));
    }
  };

  const handelActiveTask = (e, id, status) => {
    e.stopPropagation();
    if (status === TYPE_STATUS.BACKLOG) {
      dispatch(changeStatusTask(id, TYPE_STATUS.TODO));
    } else {
      dispatch(changeStatusTask(id, TYPE_STATUS.BACKLOG));
    }
    setTaskSelectRight(null);
  };

  const handleDeleteTask = (id) => {
    message.deleteConfirm().then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTask(id));
        message.success("Task has been deleted.");
      }
    });
  };
  return (
    <BackLogContainer>
      <h2>Back Log</h2>
      <BackLogMain>
        <h3>List backlog</h3>
        <BackLogList>
          {listTask &&
            listTask.map((task) => (
              <BackLogItem
                key={task.id}
                isActive={task.status !== TYPE_STATUS.BACKLOG}
                onContextMenu={(e) => handleClickItem(e, task)}
                onClick={(e) => handleClickItem(e, task)}
              >
                <div>
                  <span>
                    {task.active} {task.priority} | {task.typeIssue}
                  </span>
                  <span>-</span>
                  <span>{task.title}</span>
                </div>
                <span>{task.assignee.name || "Unassigned"}</span>
              </BackLogItem>
            ))}
          <div>
            <BoardButton
              onClick={() => {
                handleOpenForm();
              }}
            >
              Create
            </BoardButton>
          </div>
        </BackLogList>
      </BackLogMain>
      <BoardCreate />
      {taskSelectRight && (
        <BackLogItemSendto className="backlog-sento" locationOffset={locationOffset}>
          <button onClick={(e) => handelActiveTask(e, taskSelectRight.id, taskSelectRight.status)}>
            {taskSelectRight.status !== TYPE_STATUS.BACKLOG ? "Unactive" : "Active"}
          </button>
          <button onClick={() => handleDeleteTask(taskSelectRight.id)}>Delete</button>
        </BackLogItemSendto>
      )}
    </BackLogContainer>
  );
};

export default BackLog;
