import styled from "styled-components";

const TodoContainer = styled.div`
  width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  padding: 30px;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

const TodoHeader = styled.h2`
  padding: 20px 4px;
  font-size: 26px;
`;

const FilterTodoStyle = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  padding: 10px 0px;
  justify-content: flex-end;
`;

const FilterButton = styled.button`
  outline: none;
  padding: 5px 8px;
  font-size: 16px;
  color: #000;
  background-color: transparent;
  transition: 0.1s linear;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-transform: lowercase;
  cursor: pointer;
  &::first-letter {
    text-transform: uppercase;
  }
  &:hover {
    color: #fff;
    background-color: #1885f2;
  }
  &.filter--active {
    color: #fff;
    background-color: #1885f2;
  }
`;

export { FilterTodoStyle, FilterButton, TodoContainer, TodoHeader };
