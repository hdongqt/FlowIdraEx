import React, { useState } from 'react';
import BoardForm from '../BoardCreate/BoardForm';
import {
  BoardContainer,
  BoardMain,
  BoardGroup,
  BoardList,
  BoardItem,
  AppTitle,
  BoardButton,
  BoardIcon,
} from './Board.style';

const TYPE_STATUS = {
  TODO: 'TODO',
  INPROGRESS: 'INPROGRESS',
  DONE: 'DONE',
};

const Board = () => {
  const [listTask, setListTask] = useState([
    {
      id: 1,
      title: 'Board 1',
      description: 'Board 1 description',
      status: TYPE_STATUS.TODO,
    },
    {
      id: 2,
      title: 'Board 2',
      description: 'Board 2 description',
      status: TYPE_STATUS.INPROGRESS,
    },
  ]);

  const [isOpenForm, setIsOpenForm] = useState(false);
  const [taskEdit, setTaskEdit] = useState(null);

  const handelOpenForm = () => {
    setIsOpenForm(true);
  };

  const handelCloseForm = () => {
    setIsOpenForm(false);
    setTaskEdit(null);
  };

  const handelRandomId = () => {
    const id = Math.floor(Math.random() * 1000) + 1;
    if (listTask.find((task) => task.id === id)) {
      return handelRandomId();
    } else {
      return id;
    }
  };
  const handelCreateTask = (task) => {
    setListTask([...listTask, { ...task, id: handelRandomId(), status: TYPE_STATUS.TODO }]);
    handelCloseForm();
  };

  const handelEditTask = (task) => {
    const index = listTask.findIndex((item) => item.id === task.id);
    setListTask([...listTask.splice(0, index), task, ...listTask.splice(index + 1)]);
    setTaskEdit(null);
  };

  const handelDeleteTask = (id) => {
    setListTask(listTask.filter((task) => task.id !== id));
  };

  const onDragStart = (e, id) => {
    e.dataTransfer.setData('id', id);
  };

  const handleDrop = (e, status) => {
    const id = +e.dataTransfer.getData('id');
    const index = listTask.findIndex((todo) => todo.id === id);
    let list = [...listTask];
    list[index].status = status;
    setListTask(list);
  };

  const listTodo = listTask.filter((item) => item.status === TYPE_STATUS.TODO);
  const listInprogress = listTask.filter((item) => item.status === TYPE_STATUS.INPROGRESS);
  const listDone = listTask.filter((item) => item.status === TYPE_STATUS.DONE);

  return (
    <>
      <AppTitle>Kanban board</AppTitle>
      <BoardContainer>
        <BoardButton
          onClick={() => {
            setTaskEdit(null);
            handelOpenForm();
          }}
        >
          Create
        </BoardButton>
        <BoardMain>
          {/* TODO */}
          <BoardGroup onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, TYPE_STATUS.TODO)}>
            <h2>TODO ({listTodo.length})</h2>
            <BoardList>
              {listTodo.map((todo) => (
                <BoardItem key={todo.id} draggable={true} onDragStart={(e) => onDragStart(e, todo.id)}>
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                  <BoardIcon onClick={() => handelDeleteTask(todo.id)} top={'10px'} right={'10px'}>
                    <i className="las la-trash-alt"></i>
                  </BoardIcon>
                  <BoardIcon
                    onClick={() => {
                      setTaskEdit(todo);
                      handelOpenForm();
                    }}
                    top={'10px'}
                    right={'35px'}
                    color={'blue'}
                  >
                    <i className="las la-edit"></i>
                  </BoardIcon>
                </BoardItem>
              ))}
            </BoardList>
          </BoardGroup>
          {/* INPROGRESS */}
          <BoardGroup onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, TYPE_STATUS.INPROGRESS)}>
            <h2>INPROGRESS ({listInprogress.length})</h2>
            <BoardList>
              {listInprogress.map((todo) => (
                <BoardItem key={todo.id} draggable={true} onDragStart={(e) => onDragStart(e, todo.id)}>
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                  <BoardIcon onClick={() => handelDeleteTask(todo.id)} top={'10px'} right={'10px'}>
                    <i className="las la-trash-alt"></i>
                  </BoardIcon>
                  <BoardIcon
                    onClick={() => {
                      setTaskEdit(todo);
                      handelOpenForm();
                    }}
                    top={'10px'}
                    right={'35px'}
                    color={'blue'}
                  >
                    <i className="las la-edit"></i>
                  </BoardIcon>
                </BoardItem>
              ))}
            </BoardList>
          </BoardGroup>
          {/* DONE */}
          <BoardGroup onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, TYPE_STATUS.DONE)}>
            <h2>DONE ({listDone.length})</h2>
            <BoardList>
              {listDone.map((todo) => (
                <BoardItem key={todo.id} draggable={true} onDragStart={(e) => onDragStart(e, todo.id)}>
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                  <BoardIcon onClick={() => handelDeleteTask(todo.id)} top={'10px'} right={'10px'}>
                    <i className="las la-trash-alt"></i>
                  </BoardIcon>
                  <BoardIcon
                    onClick={() => {
                      setTaskEdit(todo);
                      handelOpenForm();
                    }}
                    top={'10px'}
                    right={'35px'}
                    color={'blue'}
                  >
                    <i className="las la-edit"></i>
                  </BoardIcon>
                </BoardItem>
              ))}
            </BoardList>
          </BoardGroup>
        </BoardMain>
      </BoardContainer>
      <BoardForm
        isOpenForm={isOpenForm}
        handelCloseForm={handelCloseForm}
        handelCreateTask={handelCreateTask}
        taskEdit={taskEdit}
        handelEditTask={handelEditTask}
      />
    </>
  );
};

export default Board;
