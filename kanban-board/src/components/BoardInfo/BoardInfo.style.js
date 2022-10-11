import styled from "styled-components";

const BoardInfoModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9;
  background: rgba(0, 0, 0, 0.3);
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transition: all 0.2s linear;
`;

const BoardInfoForm = styled.div`
  width: 400px;
  height: calc(100% - 20px);
  transform: translate(120%, -50%);
  transform: ${(props) => (props.isOpen ? "translate(0%, -50%)" : "translate(120%, -50%)")};
  position: fixed;
  z-index: 110;
  right: 6px;
  top: 50%;
  bottom: 0;
  transition: all 0.2s linear;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 1px 2px 20px 0px rgba(0, 0, 0, 0.2);
  padding: 40px 20px;
  overflow-y: auto;
`;

const BoardInfoInfoTask = styled.div`
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

const BoardInfoClose = styled.button`
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

const BoardInfoAssignToMe = styled.button`
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

const FormInfoMain = styled.div`
  margin-top: 10px;
`;

const FormInfoGroup = styled.div`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormInfoItem = styled.div`
  display: flex;
  label {
    width: 100px;
    padding-right: 4px;
  }
`;

const BoardInfoTaskTitleInput = styled.input`
  font-size: 16px;
  outline: none;
  border: 1px solid transparent;
  padding: 4px 8px;
  font-weight: 600;
  width: 100%;
  &:hover {
    border-color: #ccc;
  }
  &:focus {
    border-color: #333;
  }
`;

const BoardInfoTaskTitle = styled.h3`
  border: 1px solid transparent;
  word-wrap: break-word;
  font-size: 16px;
  &:hover {
    border-color: #ccc;
  }
`;

const FormInfoTextArea = styled.textarea`
  border: 1px solid transparent;
  outline: none;
  border-radius: 4px;
  font-size: 16px;
  max-width: 100%;
  &:hover {
    border-color: #ccc;
  }
  &:focus {
    border-color: #333;
  }
`;

const FormInfoGroupButton = styled.div`
  display: flex;
  gap: 6px;
  justify-content: end;
  margin-top: 6px;
`;

const FormInfoButton = styled.button`
  outline: none;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  padding: 8px 12px;
  min-width: 80px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => (props.isSubmit ? "#0065f7de" : "#fff")};
  color: ${(props) => (props.isSubmit ? "white" : "#000")};
  &:hover {
    background-color: ${(props) => (props.isSubmit ? "#0065ff" : "#fff")};
    border: ${(props) => !props.isSubmit && "1px solid #0065ff"};
  }
`;

const FormMessageError = styled.span`
  font-size: 14px;
  color: #c32b30;
  padding-top: 3px;
`;

export {
  BoardInfoModal,
  BoardInfoForm,
  BoardInfoInfoTask,
  BoardInfoClose,
  BoardInfoAssignToMe,
  FormInfoMain,
  FormInfoItem,
  BoardInfoTaskTitleInput,
  BoardInfoTaskTitle,
  FormInfoTextArea,
  FormInfoGroup,
  FormInfoGroupButton,
  FormInfoButton,
  FormMessageError,
};
