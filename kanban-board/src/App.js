import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Board from "./components/Board/Board";
import SideBar from "./components/SideBar/SideBar";
import BackLog from "./components/BackLog/BackLog";
const AppContainer = styled.div`
  display: flex;
`;

const MainContainer = styled.div`
  margin-left: 200px;
  flex: 1;
`;

function App() {
  return (
    <AppContainer className="App">
      <SideBar />
      <MainContainer>
        <Routes>
          <Route path="/" element={<Board />}></Route>
          <Route path="/backlog" element={<BackLog />}></Route>
        </Routes>
      </MainContainer>
    </AppContainer>
  );
}

export default App;
