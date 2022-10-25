import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter } from "lodash";
import * as message from "../../../utils";
import { TYPE_STATUS } from "../../../utils";
import { deleteTask, changeStatusTask, setEditTask, getTasks } from "../../../actions/boardAction";

import task from "../../../assets/images/icons/task.png";
import bug from "../../../assets/images/icons/bug.png";
import epic from "../../../assets/images/icons/epic.png";
import story from "../../../assets/images/icons/story.png";
import lowest from "../../../assets/images/icons/lowest.png";
import low from "../../../assets/images/icons/low.png";
import medium from "../../../assets/images/icons/medium.png";
import high from "../../../assets/images/icons/high.png";
import highest from "../../../assets/images/icons/highest.png";

import {
  BoardContainer,
  BoardMain,
  BoardGroup,
  BoardList,
  BoardItem,
  AppTitle,
  BoardButton,
  BoardIcon,
  BoardSearch,
  BoardAction,
  BoardAssign,
  BoardInfoTask,
  BoardInfoType,
} from "./BoardActive.style";

const BoardListItem = ({ title, list, taskEdit }) => {
  const dispatch = useDispatch();

  const onDragStart = (e, todo) => {
    e.dataTransfer.setData("todo", JSON.stringify(todo));
  };

  const handleDeleteTask = (id) => {
    message.deleteConfirm().then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTask(id, "active"));
      }
    });
  };
  return (
    <>
      <h2>
        {title} ({list.length})
      </h2>
      <BoardList>
        {list.map((todo) => (
          <BoardItem
            key={todo.id}
            draggable={true}
            onDragStart={(e) => onDragStart(e, todo)}
            className={`${todo.id === taskEdit?.id ? "selected" : ""}`}
          >
            <h3><span>{todo.title}</span></h3>
            <BoardIcon onClick={() => handleDeleteTask(todo.id)} top={"10px"} right={"10px"}>
              <i className="las la-trash-alt"></i>
            </BoardIcon>
            <BoardIcon onClick={() => dispatch(setEditTask(todo.id))} top={"10px"} right={"35px"} color={"blue"}>
              <i className="las la-edit"></i>
            </BoardIcon>
            <BoardInfoTask>
              <BoardInfoType>
                <div>
                  {todo.issue_type === "TASK" && <img src={task} alt={todo.issue_type}></img>}
                  {todo.issue_type === "BUG" && <img src={bug} alt={todo.issue_type}></img>}
                  {todo.issue_type === "EPIC" && <img src={epic} alt={todo.issue_type}></img>}
                  {todo.issue_type === "STORY" && <img src={story} alt={todo.issue_type}></img>}
                </div>
                <div>
                  {todo.priority_type === "LOWEST" && <img src={lowest} alt={todo.priority_type}></img>}
                  {todo.priority_type === "LOW" && <img src={low} alt={todo.priority_type}></img>}
                  {todo.priority_type === "MEDIUM" && <img src={medium} alt={todo.priority_type}></img>}
                  {todo.priority_type === "HIGH" && <img src={high} alt={todo.priority_type}></img>}
                  {todo.priority_type === "HIGHEST" && <img src={highest} alt={todo.priority_type}></img>}
                </div>
              </BoardInfoType>

              <BoardAssign>
                Assignee:
                {todo.assignee_id ? (
                  <span>{todo.assignee_fullname}</span>
                ) : (
                  <span className="unassign">Unassigned</span>
                )}
              </BoardAssign>
            </BoardInfoTask>
          </BoardItem>
        ))}
      </BoardList>
    </>
  );
};

const BoardActive = () => {
  const dispatch = useDispatch();
  const listTask = useSelector((state) => state.boardReducer.listTask);

  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleDrop = (e, status) => {
    const todo = JSON.parse(e.dataTransfer.getData("todo"));
    if (todo.task_status !== status) {
      dispatch(changeStatusTask(todo.id, status, "active"));
    }
  };

  const listTodo = filter(listTask, (item) => item.task_status === TYPE_STATUS.TODO);
  const listInprogress = filter(listTask, (item) => item.task_status === TYPE_STATUS.INPROGRESS);
  const listDone = filter(listTask, (item) => item.task_status === TYPE_STATUS.DONE);

  return (
    <>
      <BoardContainer>
        <AppTitle>Kanban board</AppTitle>
        <BoardAction>
          <BoardSearch
            type="text"
            placeholder="Type to search..."
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                dispatch(getTasks(searchText, "active"));
              }
            }}
          />
          <BoardButton onClick={() => dispatch(getTasks(searchText, "active"))}>Search</BoardButton>
        </BoardAction>
        <BoardMain>
          <BoardGroup onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, TYPE_STATUS.TODO)}>
            <BoardListItem title={TYPE_STATUS.TODO} list={listTodo} />
          </BoardGroup>
          <BoardGroup
            bgTitleColor={"#F8B445"}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, TYPE_STATUS.INPROGRESS)}
          >
            <BoardListItem title={TYPE_STATUS.INPROGRESS} list={listInprogress} />
          </BoardGroup>
          <BoardGroup
            bgTitleColor={"#4BC456"}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, TYPE_STATUS.DONE)}
          >
            <BoardListItem title={TYPE_STATUS.DONE} list={listDone} />
          </BoardGroup>
        </BoardMain>
      </BoardContainer>
    </>
  );
};

export default BoardActive;
