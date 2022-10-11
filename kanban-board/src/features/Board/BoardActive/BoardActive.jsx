import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter } from "lodash";
import * as message from "../../../utils";
import { TYPE_STATUS } from "../../../utils";
import { changeSearchFilter, deleteTask, changeStatusTask, setEditTask } from "../../../actions/boardAction";

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

  const onDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
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
    <>
      <h2>
        {title} ({list.length})
      </h2>
      <BoardList>
        {list.map((todo) => (
          <BoardItem
            key={todo.id}
            draggable={true}
            onDragStart={(e) => onDragStart(e, todo.id)}
            className={`${todo.id === taskEdit?.id ? "selected" : ""}`}
          >
            <h3>{todo.title}</h3>
            <BoardIcon onClick={() => handleDeleteTask(todo.id)} top={"10px"} right={"10px"}>
              <i className="las la-trash-alt"></i>
            </BoardIcon>
            <BoardIcon onClick={() => dispatch(setEditTask(todo))} top={"10px"} right={"35px"} color={"blue"}>
              <i className="las la-edit"></i>
            </BoardIcon>
            <BoardInfoTask>
              <BoardInfoType>
                <div>
                  {todo.typeIssue === "TASK" && <img src={task} alt={todo.typeIssue}></img>}
                  {todo.typeIssue === "BUG" && <img src={bug} alt={todo.typeIssue}></img>}
                  {todo.typeIssue === "EPIC" && <img src={epic} alt={todo.typeIssue}></img>}
                  {todo.typeIssue === "STORY" && <img src={story} alt={todo.typeIssue}></img>}
                </div>
                <div>
                  {todo.priority === "LOWEST" && <img src={lowest} alt={todo.priority}></img>}
                  {todo.priority === "LOW" && <img src={low} alt={todo.priority}></img>}
                  {todo.priority === "MEDIUM" && <img src={medium} alt={todo.priority}></img>}
                  {todo.priority === "HIGH" && <img src={high} alt={todo.priority}></img>}
                  {todo.priority === "HIGHEST" && <img src={highest} alt={todo.priority}></img>}
                </div>
              </BoardInfoType>

              <BoardAssign>
                Assignee:
                {todo.assignee && todo.assignee.name ? (
                  <span>{todo.assignee.name}</span>
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
  const searchFilter = useSelector((state) => state.boardReducer.searchFilter);
  const [listTaskActive, setListTaskActive] = useState([]);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setListTaskActive(filter(listTask, (task) => task.status !== TYPE_STATUS.BACKLOG));
  }, [listTask]);

  const handleDrop = (e, status) => {
    const id = +e.dataTransfer.getData("id");
    dispatch(changeStatusTask(id, status));
  };

  const listTodo = filter(
    listTaskActive,
    (item) => item.status === TYPE_STATUS.TODO && item.title.toLowerCase().includes(searchFilter.trim().toLowerCase())
  );
  const listInprogress = filter(
    listTaskActive,
    (item) =>
      item.status === TYPE_STATUS.INPROGRESS && item.title.toLowerCase().includes(searchFilter.trim().toLowerCase())
  );
  const listDone = filter(
    listTaskActive,
    (item) => item.status === TYPE_STATUS.DONE && item.title.toLowerCase().includes(searchFilter.trim().toLowerCase())
  );

  return (
    <BoardContainer>
      <AppTitle>Kanban board</AppTitle>
      <BoardAction>
        <BoardSearch
          type="text"
          placeholder="Type to search..."
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              dispatch(changeSearchFilter(searchText));
            }
          }}
        />
        <BoardButton onClick={() => dispatch(changeSearchFilter(searchText))}>Search</BoardButton>
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
  );
};

export default BoardActive;
