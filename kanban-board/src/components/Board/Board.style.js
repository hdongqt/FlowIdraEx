import styled from 'styled-components';
const BoardContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding: 30px 100px;
`;

const BoardMain = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 10px;
  min-height: 100vh;
`;

const BoardGroup = styled.div`
  background-color: #f4f5f7;
  padding: 10px 10px;
  & > h2 {
    padding-bottom: 10px;
  }
`;
const BoardList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

const BoardItem = styled.div`
  cursor: move;
  padding: 6px;
  position: relative;
  z-index: 2;
  background-color: #fff;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  min-height: 120px;
  transition: 0.2s linear;
  &:hover {
    background-color: #ccc;
  }
`;

const BoardIcon = styled.span`
  position: absolute;
  top: ${(props) => (props.top ? props.top : '0px')};
  right: ${(props) => (props.right ? props.right : '0px')};
  color: ${(props) => (props.color ? props.color : 'red')};
  z-index: 3;
  font-size: 24px;
  padding: 4px;
  cursor: pointer;
  transition: all 0.2s linear;
  &:hover {
    opacity: 0.6;
  }
`;

const AppTitle = styled.h1`
  text-align: center;
`;

const BoardButton = styled.button`
  outline: none;
  border: 1px solid #ccc;
  padding: 8px 14px;
  margin-bottom: 20px;
  background-color: #2684ff;
  color: #fff;
  font-weight: 600;
  transition: all 0.2s linear;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #6aa2ec;
  }
`;

export { BoardContainer, BoardMain, BoardGroup, BoardList, BoardItem, AppTitle, BoardButton, BoardIcon };
