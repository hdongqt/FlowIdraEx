import styled from "styled-components";

const BoardAssignModal = styled.div`
  width: 400px;
  height: 40vh;
  position: fixed;
  z-index: 10;
  right: 6px;
  top: 50%;
  bottom: 0;
  transform: translate(120%, -50%);
  transform: ${(props) =>
    props.isOpen ? "translate(0%, -50%)" : "translate(120%, -50%)"};
  transition: all 0.2s linear;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 1px 2px 25px 0px rgba(95, 169, 255, 0.54);
  padding: 40px 20px;
`;

const BoardAssignTo = styled.div`
  display: flex;
  padding-top: 20px;
  align-items: center;
  margin-bottom: 10px;
  span {
    padding-right: 16px;
  }
  select {
    min-width: 160px;
    font-size: 14px;
    padding: 6px 6px;
  }
`;

const BoardAssignInfoTask = styled.div`
  width: 100%;
  border-bottom: 1px solid #000;
  padding-bottom: 20px;

  & > h3 {
    font-size: 20px;
  }
  & > p {
    font-size: 18px;
    margin-top: 10px;
  }
`;

const BoardAssignClose = styled.button`
  outline: none;
  border: 1px solid #ccc;
  border-radius: 2px;
  background-color: #fff;
  font-size: 14px;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  background-color: #fff;
  &:hover {
    background-color: #ff6550;
    color: #fff;
  }
`;

const BoardAssignApply = styled.button`
  outline: none;
  border: 1px solid #ccc;
  border-radius: 2px;
  background-color: #fff;
  font-size: 14px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: green;
  font-size: 22px;
  background-color: #fff;
  margin-left: 5px;
`;

const BoardAssignAssignToMe = styled.button`
  outline: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  background-color: transparent;
  color: #2b6fd8;
  padding: 8px 10px 8px 0px;
  &:hover {
    text-decoration: underline;
  }
`;

export {
  BoardAssignModal,
  BoardAssignTo,
  BoardAssignInfoTask,
  BoardAssignClose,
  BoardAssignApply,
  BoardAssignAssignToMe,
};
