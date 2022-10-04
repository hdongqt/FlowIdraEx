import React, { useState } from "react";
import Swal from "sweetalert2";
import { Routes, Route } from "react-router-dom";
import { filter } from "lodash";
import BoardInfo from "../BoardInfo/BoardInfo";
import { TYPE_STATUS } from "../../utils/typeTask";
import BoardActive from "./../BoardActive/BoardActive";
import BackLog from "./../BackLog/BackLog";

const Board = () => {
  const [listTask, setListTask] = useState([
    {
      id: 1,
      title: "Board 1",
      description:
        "Board 1 description Board 1 description Board 1 descriptionBoard 1 description Board 1 description Board 1 description Board 1 description",
      status: TYPE_STATUS.TODO,
      active: true,
      typeIssue: "BUG",
      priority: "MEDIUM",
      reporter: {
        id: 2,
        name: "Alice",
        email: "alice@example.com",
      },
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
      active: true,
      typeIssue: "TASK",
      priority: "MEDIUM",
      reporter: {
        id: 2,
        name: "Alice",
        email: "alice@example.com",
      },
      assignee: {},
    },
  ]);
  const [taskEdit, setTaskEdit] = useState(null);

  const handelEditTask = (task) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        const listNew = listTask.map((item) => {
          if (item.id === task.id) {
            return task;
          } else return item;
        });
        setListTask(listNew);
        resolve("Edit task successfully !");
        setTaskEdit(null);
      }, 1000)
    );
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

  return (
    <>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <BoardActive
              listTask={listTask}
              setListTask={setListTask}
              setTaskEdit={setTaskEdit}
              handleDeleteTask={handleDeleteTask}
            />
          }
        ></Route>
        <Route
          path="/backlog"
          element={
            <BackLog
              listTask={listTask}
              setListTask={setListTask}
              setTaskEdit={setTaskEdit}
              handleDeleteTask={handleDeleteTask}
            />
          }
        ></Route>
      </Routes>
      <BoardInfo taskEdit={taskEdit} setTaskEdit={setTaskEdit} handelEditTask={handelEditTask} />
    </>
  );
};

export default Board;
