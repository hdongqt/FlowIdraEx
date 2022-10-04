import styled from "styled-components";
import SideBar from "./components/SideBar/SideBar";
import Board from "./components/Board/Board";
const AppContainer = styled.div`
  display: flex;
`;

const MainContainer = styled.div`
  margin-left: 200px;
  flex: 1;
`;

function App() {
  return (
    <AppContainer
      className="App"
      onClick={() => {
        const active = document.querySelector(".backlog-sento");
        if (active) active.style.display = "none";
      }}
    >
      <SideBar />
      <MainContainer>
        <Board />
      </MainContainer>
    </AppContainer>
  );
}

export default App;
