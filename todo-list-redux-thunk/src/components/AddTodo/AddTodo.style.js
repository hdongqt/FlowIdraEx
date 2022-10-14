import styled from "styled-components";

const AddTodoStyle = styled.div`
  display: flex;
  width: 100%;
`;

const AddTodoInput = styled.input`
  border: 1px solid #ccc;
  outline: none;
  font-size: 16px;
  border-radius: 4px 0px 0px 4px;
  padding: 2px 6px;
  flex: 1;
`;

const AddTodoButton = styled.button`
  outline: none;
  background-color: #1885f2;
  border: none;
  color: #fff;
  min-width: 80px;
  padding: 10px 3px;
  cursor: pointer;
  border-radius: 0px 4px 4px 0px;
`;

const ClearEditButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  padding: 4px 8px;
  outline: none;
  border: none;
  background-color: red;
  color: #fff;
`;

export { AddTodoButton, AddTodoInput, AddTodoStyle, ClearEditButton };
