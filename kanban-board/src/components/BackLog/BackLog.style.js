import styled from "styled-components";

const BackLogContainer = styled.div`
  padding: 30px 20px;
  & > h2 {
    text-align: center;
  }
`;
const BoardButton = styled.button`
  outline: none;
  border: 1px solid #ccc;
  padding: 8px 14px;
  background-color: #2684ff;
  color: #fff;
  font-weight: 600;
  transition: all 0.2s linear;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background-color: #6aa2ec;
  }
`;
const BackLogMain = styled.div`
  height: 100vh;
  margin-top: 16px;
  padding: 26px 16px;
  background-color: #f4f5f7;
`;
const BackLogList = styled.div`
  padding: 6px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const BackLogItem = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 6px 8px;
  border: 3px solid;
  border-color: ${(props) => (props.isActive ? "#52b471" : "#d0d0d0")};
  border-radius: 4px;
  &:hover {
    background-color: #ebecf0;
  }
`;

const BackLogItemSendto = styled.div`
  position: fixed;
  z-index: 8;
  top: ${(props) => props?.locationOffset.top + "px"};
  left: ${(props) => props?.locationOffset.left + "px"};
  display: flex;
  min-width: 150px;
  flex-direction: column;
  border: 1px solid #ccc;
  button {
    outline: none;
    background-color: #fff;
    color: #000;
    border: none;
    padding: 6px 18px 6px 8px;
    text-align: left;
    cursor: pointer;
    font-size: 16px;
    &:hover {
      background-color: #ebecf0;
    }
  }
`;
export { BackLogContainer, BoardButton, BackLogMain, BackLogList, BackLogItem, BackLogItemSendto };
