import React, { useEffect, useState } from "react";
import { TYPE_STATUS } from "../../utils/typeTask";
import { findIndex, filter } from "lodash";

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
} from "./BoardActive.style";

const BoardListItem = ({ title, list, handleDeleteTask, setTaskEdit }) => {
  const onDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
  };
  return (
    <>
      <h2>
        {title} ({list.length})
      </h2>
      <BoardList>
        {list.map((todo) => (
          <BoardItem key={todo.id} draggable={true} onDragStart={(e) => onDragStart(e, todo.id)}>
            <h3>{todo.title}</h3>
            <BoardIcon onClick={() => handleDeleteTask(todo.id)} top={"10px"} right={"10px"}>
              <i className="las la-trash-alt"></i>
            </BoardIcon>
            <BoardIcon
              onClick={() => {
                setTaskEdit(todo);
              }}
              top={"10px"}
              right={"35px"}
              color={"blue"}
            >
              <i className="las la-edit"></i>
            </BoardIcon>
            <BoardIcon
              onClick={() => {
                setTaskEdit(todo);
              }}
              top={"10px"}
              right={"35px"}
              color={"blue"}
            >
              <i className="las la-edit"></i>
            </BoardIcon>
            <BoardAssign>
              Assignee:
              {todo.assignee && todo.assignee.name ? (
                <span>{todo.assignee.name}</span>
              ) : (
                <span className="unassign">Unassigned</span>
              )}
            </BoardAssign>
          </BoardItem>
        ))}
      </BoardList>
    </>
  );
};

const BoardActive = ({ listTask, setListTask, setTaskEdit, handleDeleteTask }) => {
  const [listTaskActive, setListTaskActive] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    setListTaskActive(filter(listTask, (task) => task.active));
  }, [listTask]);

  const handleSearch = () => {
    setSearchKey(searchText);
  };
  const handleDrop = (e, status) => {
    const id = +e.dataTransfer.getData("id");
    const index = findIndex(listTask, (todo) => todo.id === id);
    let list = [...listTask];
    list[index].status = status;
    setListTask(list);
  };

  const listTodo = filter(
    listTaskActive,
    (item) => item.status === TYPE_STATUS.TODO && item.title.toLowerCase().includes(searchKey.trim().toLowerCase())
  );
  const listInprogress = filter(
    listTaskActive,
    (item) =>
      item.status === TYPE_STATUS.INPROGRESS && item.title.toLowerCase().includes(searchKey.trim().toLowerCase())
  );
  const listDone = filter(
    listTaskActive,
    (item) => item.status === TYPE_STATUS.DONE && item.title.toLowerCase().includes(searchKey.trim().toLowerCase())
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
            if (e.key === "Enter") handleSearch();
          }}
        />
        <BoardButton onClick={() => handleSearch()}>Search</BoardButton>
      </BoardAction>
      <BoardMain>
        <BoardGroup onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, TYPE_STATUS.TODO)}>
          <BoardListItem
            title={"TODO"}
            list={listTodo}
            listTask={listTaskActive}
            handleDeleteTask={handleDeleteTask}
            setTaskEdit={setTaskEdit}
          />
        </BoardGroup>
        <BoardGroup
          bgTitleColor={"#F8B445"}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, TYPE_STATUS.INPROGRESS)}
        >
          <BoardListItem
            title={"INPROGRESS"}
            list={listInprogress}
            listTask={listTaskActive}
            handleDeleteTask={handleDeleteTask}
            setTaskEdit={setTaskEdit}
          />
        </BoardGroup>
        <BoardGroup
          bgTitleColor={"#4BC456"}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, TYPE_STATUS.DONE)}
        >
          <BoardListItem
            title={"DONE"}
            list={listDone}
            listTask={listTaskActive}
            handleDeleteTask={handleDeleteTask}
            setTaskEdit={setTaskEdit}
          />
        </BoardGroup>
      </BoardMain>
    </BoardContainer>
  );
};

export default BoardActive;
