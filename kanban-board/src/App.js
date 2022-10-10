import Board from "./features/Board";

function App() {
  return (
    <div
      className="App"
      onClick={() => {
        const active = document.querySelector(".backlog-sento");
        if (active) active.style.display = "none";
      }}
    >
      <Board />
    </div>
  );
}

export default App;
