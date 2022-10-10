import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import BoardInfo from "../../components/BoardInfo/BoardInfo";
import BoardActive from "./pages/BoardActive/BoardActive";
import BackLog from "./pages/BackLog/BackLog";
import SideBar from "../../components/SideBar/SideBar";

const BoardContainer = styled.div`
  padding-left: 200px;
`;

const Board = () => {
  return (
    <BoardContainer>
      <SideBar />
      <Routes>
        <Route path="/" exact element={<BoardActive />}></Route>
        <Route path="/backlog" element={<BackLog />}></Route>
      </Routes>
      <BoardInfo />
    </BoardContainer>
  );
};

export default Board;
