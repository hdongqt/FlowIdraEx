import { MainRoutes } from "./routes";
import SideBar from "./components/SideBar/SideBar";
import styled from "styled-components";
import BoardInfo from "./components/BoardInfo/BoardInfo";
import Loading from "./components/Loading/Loading";

const BoardContainer = styled.div`
  padding-left: 200px;
`;

function App() {
  return (
    <div
      className="App"
      onClick={() => {
        const active = document.querySelector(".backlog-sento");
        if (active) active.style.display = "none";
      }}
    >
      <SideBar />
      <BoardContainer>
        <MainRoutes />
        <BoardInfo />
      </BoardContainer>
      <Loading />
    </div>
  );
}

export default App;
