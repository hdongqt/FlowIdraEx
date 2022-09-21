import CountdownClass from './components/Countdown/CountdownClass';
import CountdownFunc from './components/Countdown/CountdownFunc';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

function App() {
  return (
    <AppContainer>
      <CountdownClass />
      <br />
      <CountdownFunc />
    </AppContainer>
  );
}

export default App;
