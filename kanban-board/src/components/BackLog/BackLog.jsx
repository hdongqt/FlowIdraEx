import React, { useEffect, useState } from "react";
import { find, map } from "lodash";
import { TYPE_STATUS } from "../../utils/typeTask";
import {
  BackLogContainer,
  BoardButton,
  BackLogMain,
  BackLogList,
  BackLogItem,
  BackLogItemSendto,
} from "./BackLog.style";

import BoardForm from "../BoardCreate/BoardForm";

const BackLog = ({ listTask, setListTask, setTaskEdit, handleDeleteTask }) => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [locationOffset, setLocationOffset] = useState({
    top: 0,
    left: 0,
  });
  const [taskSelectRight, setTaskSelectRight] = useState(null);

  useEffect(() => {
    return () => {
      setTaskEdit(null);
    };
  }, [setTaskEdit]);
  const handleRandomId = () => {
    const id = Math.floor(Math.random() * 1000) + 1;
    if (find(listTask, (task) => task.id === id)) {
      return handleRandomId();
    } else {
      return id;
    }
  };

  const handleCreateTask = (task) => {
    return new Promise(function (resolve) {
      setTimeout(() => {
        setListTask([
          ...listTask,
          {
            ...task,
            id: handleRandomId(),
            status: TYPE_STATUS.TODO,
            active: false,
          },
        ]);
        resolve("New task created successfully !");
      }, 1000);
    });
  };
  const handleOpenForm = () => {
    setTaskEdit(null);
    setIsOpenForm(true);
  };

  const handleCloseForm = () => {
    setIsOpenForm(false);
  };
  const handleClickItem = (e, taskSelect) => {
    e.preventDefault();
    if (e.type === "contextmenu") {
      setLocationOffset({
        top: e.pageY,
        left: e.pageX,
      });
      setTaskSelectRight(taskSelect);
      const activeElement = document.querySelector(".backlog-sento");
      if (activeElement) activeElement.style.display = "flex";
    } else {
      setTaskEdit(taskSelect);
    }
  };

  const handelSendToActive = (e, id) => {
    e.stopPropagation();
    const listNew = map(listTask, (task) => {
      if (task.id === id) {
        return {
          ...task,
          active: true,
        };
      } else return task;
    });
    setListTask(listNew);
    setTaskSelectRight(null);
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
                isActive={task.active}
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
      <BoardForm isOpenForm={isOpenForm} handleCloseForm={handleCloseForm} handleCreateTask={handleCreateTask} />
      {taskSelectRight && (
        <BackLogItemSendto className="backlog-sento" locationOffset={locationOffset}>
          {!taskSelectRight.active && (
            <button onClick={(e) => handelSendToActive(e, taskSelectRight.id)}>Active {taskSelectRight.id}</button>
          )}
          <button onClick={(e) => handleDeleteTask(taskSelectRight.id)}>Delete</button>
        </BackLogItemSendto>
      )}
    </BackLogContainer>
  );
};

export default BackLog;
