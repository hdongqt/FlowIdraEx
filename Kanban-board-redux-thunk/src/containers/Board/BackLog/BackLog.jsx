import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as message from "../../../utils";
import BoardCreate from "../../../components/BoardCreate/BoardCreate";
import { TYPE_STATUS } from "../../../utils";
import { changeStatusTask, deleteTask, getTasks, setEditTask } from "../../../actions/boardAction";
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

  const [isOpenFormCreate, setIsOpenFormCreate] = useState(false);

  useEffect(() => {
    dispatch(getTasks("", "backlog"));
  }, [dispatch]);

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
      dispatch(setEditTask(taskSelect.id));
    }
  };

  const handelActiveTask = (e, status) => {
    e.stopPropagation();
    if (taskSelectRight.task_status === TYPE_STATUS.BACKLOG) {
      dispatch(changeStatusTask(taskSelectRight.id, TYPE_STATUS.TODO, "backlog"));
    } else {
      dispatch(changeStatusTask(taskSelectRight.id, TYPE_STATUS.BACKLOG, "backlog"));
    }
    setTaskSelectRight(null);
  };

  const handleDeleteTask = (id) => {
    message.deleteConfirm().then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTask(id, "backlog"));
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
                isActive={task.task_status !== TYPE_STATUS.BACKLOG}
                onContextMenu={(e) => handleClickItem(e, task)}
                onClick={(e) => handleClickItem(e, task)}
              >
                <div>
                  <span>
                    {task?.priority_type} | {task?.issue_type}
                  </span>
                  <span> | </span>
                  <span>{task.title}</span>
                </div>
                <span>{task?.assignee_fullname || "Unassigned"}</span>
              </BackLogItem>
            ))}
          <div>
            <BoardButton onClick={() => setIsOpenFormCreate(true)}>Create</BoardButton>
          </div>
        </BackLogList>
      </BackLogMain>
      {isOpenFormCreate && <BoardCreate setIsOpenFormCreate={setIsOpenFormCreate} />}
      {taskSelectRight && (
        <BackLogItemSendto className="backlog-sento" locationOffset={locationOffset}>
          <button onClick={(e) => handelActiveTask(e)}>
            {taskSelectRight.task_status !== TYPE_STATUS.BACKLOG ? "Unactive" : "Active"}
          </button>
          <button onClick={() => handleDeleteTask(taskSelectRight.id)}>Delete</button>
        </BackLogItemSendto>
      )}
    </BackLogContainer>
  );
};

export default BackLog;
