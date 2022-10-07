import styled, { keyframes } from "styled-components";

const FormStyle = styled.form`
  width: 800px;
  padding: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  & + .form-group {
    margin-top: 20px;
  }
`;

const FormLabel = styled.label`
  font-size: 1.2rem;
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

const NumberInput = styled.input.attrs({
  type: "number",
})`
  outline: none;
  border: 1px solid #ccc;
  font-size: 16px;
  padding: 8px 8px;
`;

const FormMessageError = styled.span`
  font-size: 14px;
  color: #c32b30;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const FormButton = styled.button`
  font-size: 16px;
  outline: none;
  padding: 8px 12px;
  min-width: 80px;
  background-color: ${(props) => (props.isSubmit ? "#2769c8de" : "#fff")};
  border: 1px solid #ccc;
  color: ${(props) => (props.isSubmit ? "white" : "#000")};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #c8ddf6;
    color: #fff;
  }
  & + button {
    margin-left: 10px;
  }
  & .btn-icon-loading {
    color: #fff;
    padding-right: 4px;
    & i {
      font-size: 20px;
      line-height: 20px;
      animation: ${rotate} 1s linear infinite;
    }
  }
`;

const FormSelect = styled.select`
  padding: 8px;
  font-size: 16px;
`;

const ButtonGroupStep = styled.div`
  display: flex;
  justify-content: center;
  width: 800px;
  padding: 18px 20px;
`;

export {
  TextInput,
  FormGroup,
  FormStyle,
  FormLabel,
  FormButton,
  ButtonGroupStep,
  FormSelect,
  FormMessageError,
  NumberInput,
};
