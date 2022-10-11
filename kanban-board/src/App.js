import MainRoutes from "./routes/MainRoutes";
import SideBar from "./components/SideBar/SideBar";
import styled from "styled-components";

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
      </BoardContainer>
    </div>
  );
}

export default App;
