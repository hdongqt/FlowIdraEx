import styled, { keyframes } from "styled-components";

const FormOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 8;
  background-color: #cccccc82;
  transition: all 0.2s linear;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const BoardForm = styled.form`
  width: 700px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  z-index: 9;
  border-radius: 20px;
  max-height: 100vh;
  overflow-y: auto;
  padding: 30px 60px;
  transition: 0.2s linear;
  & > h3 {
    text-align: center;
    font-size: 30px;
    padding-bottom: 50px;
  }
`;
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  & + .form-group {
    margin-top: 30px;
  }
  &.form-group-btn {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 40px;
  }
`;

const FormLabel = styled.label`
  font-size: 16px;
  padding-bottom: 8px;
`;

const TextInput = styled.input.attrs({
  type: "text",
})`
  outline: none;
  border: 1px solid #ccc;
  font-size: 16px;
  padding: 8px 8px;
`;

const TextArea = styled.textarea`
  outline: none;
  border: 1px solid #ccc;
  padding: 8px 8px;
  font-size: 16px;
  max-width: 100%;
`;

const FormSelect = styled.select`
  outline: none;
  border: 1px solid #ccc;
  font-size: 16px;
  padding: 8px 8px;
`;

const FormAssignToMe = styled.span`
  margin-top: 14px;
  font-size: 16px;
  cursor: pointer;
  color: #2b6fdd;
  align-self: flex-start;
  border-bottom: 1px solid transparent;
  &:hover {
    border-bottom-color: #ccc;
  }
`;

const FormButton = styled.button`
  font-size: 16px;
  outline: none;
  padding: 8px 12px;
  min-width: 80px;
  background-color: ${(props) => (props.isSubmit ? "#0065f7de" : "#fff")};
  border: 1px solid #ccc;
  color: ${(props) => (props.isSubmit ? "white" : "#000")};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.isSubmit ? "#0065ff" : "#fff")};
    border: ${(props) => !props.isSubmit && "1px solid #0065ff"};
  }
  & + button {
    margin-left: 10px;
  }
`;
const FormMessageError = styled.span`
  font-size: 14px;
  color: #c32b30;
  padding-top: 6px;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const FormIconLoader = styled.span`
  font-size: 19px;
  color: #fff;
  padding-right: 6px;
  i {
    animation: ${rotate} 2s linear infinite;
  }
`;

export {
  FormOverlay,
  BoardForm,
  FormGroup,
  FormLabel,
  TextInput,
  TextArea,
  FormSelect,
  FormAssignToMe,
  FormButton,
  FormMessageError,
  FormIconLoader,
};
