import styled from "styled-components";
const CountdownContainer = styled.div`
  height: 200px;
  width: 500px;
  margin: 100px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CountdownAction = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 20px;
`;

export { CountdownContainer, CountdownAction };
