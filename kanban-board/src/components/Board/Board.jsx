import React, { useState } from "react";
import Swal from "sweetalert2";
import { findIndex, find, filter, map } from "lodash";
import BoardForm from "../BoardCreate/BoardForm";
import BoardAssign from "./../BoardAssign/BoardAssign";
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
  BoardAssignButton,
} from "./Board.style";

const TYPE_STATUS = {
  TODO: "TODO",
  INPROGRESS: "INPROGRESS",
  DONE: "DONE",
};

const Board = () => {
  const [listTask, setListTask] = useState([
    {
      id: 1,
      title: "Board 1",
      description: "Board 1 description",
      status: TYPE_STATUS.TODO,
      assignee: {
        id: 2,
        name: "Alice",
        email: "alice@example.com",
      },
    },
    {
      id: 2,
      title: "Board 2",
      description: "Board 2 description",
      status: TYPE_STATUS.TODO,
      assignee: {},
    },
  ]);

  const [isOpenForm, setIsOpenForm] = useState(false);
  const [taskEdit, setTaskEdit] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [taskOnAssign, setTaskOnAssign] = useState(null);
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const handleOpenForm = () => {
    if (taskOnAssign) {
      setTaskOnAssign(null);
    }
    setIsOpenForm(true);
  };

  const handleCloseForm = () => {
    setIsOpenForm(false);
    setIsLoadingForm(false);
  };

  const handleRandomId = () => {
    const id = Math.floor(Math.random() * 1000) + 1;
    if (find(listTask, (task) => task.id === id)) {
      return handleRandomId();
    } else {
      return id;
    }
  };

  const handleCreateOrEditTask = (task) => {
    setIsLoadingForm(true);
    if (task.id) {
      setTimeout(() => {
        setListTask(
          map(listTask, (item) => {
            if (item.id === task.id) return task;
            return item;
          })
        );
        setTaskEdit(null);
        handleCloseForm();
      }, 1000);
    } else {
      setTimeout(() => {
        setListTask([
          ...listTask,
          { ...task, id: handleRandomId(), status: TYPE_STATUS.TODO },
        ]);
        handleCloseForm();
      }, 1000);
    }
  };

  const handleDeleteTask = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setListTask(filter(listTask, (task) => task.id !== id));
        Swal.fire("Deleted!", "Task has been deleted.", "success");
      }
    });
  };

  const onDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
  };

  const handleDrop = (e, status) => {
    const id = +e.dataTransfer.getData("id");
    const index = findIndex(listTask, (todo) => todo.id === id);
    let list = [...listTask];
    list[index].status = status;
    setListTask(list);
  };

  const handleChangeAssignment = (task) => {
    setListTask(map(listTask, (item) => (item.id === task.id ? task : item)));
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Change assignment successfully !",
      showConfirmButton: false,
      timer: 1000,
    });
    setTaskOnAssign(null);
  };

  const handleSearch = () => {
    setSearchKey(searchText);
  };

  const BoardListItem = ({ title, list }) => {
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
            >
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <BoardIcon
                onClick={() => handleDeleteTask(todo.id)}
                top={"10px"}
                right={"10px"}
              >
                <i className="las la-trash-alt"></i>
              </BoardIcon>
              <BoardIcon
                onClick={() => {
                  setTaskEdit(todo);
                  handleOpenForm();
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
                  handleOpenForm();
                }}
                top={"10px"}
                right={"35px"}
                color={"blue"}
              >
                <i className="las la-edit"></i>
              </BoardIcon>
              <BoardAssignButton onClick={() => setTaskOnAssign(todo)}>
                {todo.assignee && todo.assignee.name
                  ? `Assignee : ${todo.assignee.name}`
                  : "Assign: Unassigned"}
              </BoardAssignButton>
            </BoardItem>
          ))}
        </BoardList>
      </>
    );
  };

  const listTodo = filter(
    listTask,
    (item) => item.status === TYPE_STATUS.TODO && item.title.includes(searchKey)
  );
  const listInprogress = filter(
    listTask,
    (item) =>
      item.status === TYPE_STATUS.INPROGRESS && item.title.includes(searchKey)
  );
  const listDone = filter(
    listTask,
    (item) => item.status === TYPE_STATUS.DONE && item.title.includes(searchKey)
  );

  return (
    <>
      <AppTitle>Kanban board</AppTitle>
      <BoardContainer>
        <BoardAction>
          <BoardButton
            onClick={() => {
              handleOpenForm();
            }}
          >
            Create
          </BoardButton>
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
          <BoardGroup
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, TYPE_STATUS.TODO)}
          >
            <BoardListItem title={"TODO"} list={listTodo} />
          </BoardGroup>
          <BoardGroup
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, TYPE_STATUS.INPROGRESS)}
          >
            <BoardListItem title={"INPROGRESS"} list={listInprogress} />
          </BoardGroup>
          <BoardGroup
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, TYPE_STATUS.DONE)}
          >
            <BoardListItem title={"DONE"} list={listDone} />
          </BoardGroup>
        </BoardMain>
      </BoardContainer>
      <BoardForm
        isOpenForm={isOpenForm}
        isLoadingForm={isLoadingForm}
        handleCloseForm={handleCloseForm}
        handleCreateOrEditTask={handleCreateOrEditTask}
        taskEdit={taskEdit}
      />
      <BoardAssign
        taskAssign={taskOnAssign}
        handleChangeAssignment={handleChangeAssignment}
        setTaskOnAssign={setTaskOnAssign}
      />
    </>
  );
};

export default Board;
