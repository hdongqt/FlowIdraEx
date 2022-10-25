import styled from "styled-components";

const BoardContainer = styled.div`
  flex: 1;
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
  position: relative;
  z-index: 1;
  padding: 0px 0px 10px 0px;

  & > h2 {
    color: #fff;
    padding: 10px 4px;
    text-align: center;
    border-radius: 6px 6px 0 0;
    background-color: ${(props) => (props.bgTitleColor ? props.bgTitleColor : "#507bcc")};
  }
`;
const BoardList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  padding: 10px 10px;
  position: relative;
  z-index: 1;
`;

const BoardItem = styled.div`
  cursor: move;
  padding: 6px;
  position: relative;
  background-color: #fff;
  border-radius: 6px;
  border: 2px solid #9b50cc;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  min-height: 120px;
  transition: 0.2s linear;

  &:hover {
    border-color: #ff05d7;
  }

  & > h3 > span {
    max-width: 80%;
    font-size: 16px;
    line-height: 18px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &.selected {
    background-color: #ccc;
  }
`;

const BoardIcon = styled.span`
  position: absolute;
  top: ${(props) => (props.top ? props.top : "0px")};
  right: ${(props) => props.right ?? "0px"};
  color: ${(props) => props.color ?? "red"};
  z-index: 2;
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
  padding-bottom: 20px;
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
  cursor: pointer;

  &:hover {
    background-color: #6aa2ec;
  }
`;

const BoardSearch = styled.input`
  border: none;
  outline: none;
  width: 300px;
  border: 1px solid #ccc;
  font-size: 16px;
  padding: 8px 10px;
  border-radius: 4px;
  margin-right: 10px;
`;

const BoardAction = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-bottom: 20px;
`;

const BoardInfoTask = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 2px;
  justify-content: space-between;
  align-items: center;
  padding: 0 6px;
`;

const BoardInfoType = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  img {
    display: block;
    width: 20px;
    height: 20px;
  }
`;

const BoardAssign = styled.span`
  display: flex;
  align-items: center;

  font-size: 14px;
  color: #333;
  transition: 0.2s linear;

  &:hover {
    color: #000;
  }

  i {
    padding-left: 6px;
    font-size: 20px;
  }

  span {
    color: #0035ff;
    padding-left: 4px;
  }

  .unassign {
    color: #ff4444;
  }
`;
export {
    BoardContainer,
    BoardMain,
    BoardGroup,
    BoardList,
    BoardItem,
    AppTitle,
    BoardButton,
    BoardIcon,
    BoardSearch,
    BoardAction,
    BoardAssign,
    BoardInfoTask,
    BoardInfoType,
};
