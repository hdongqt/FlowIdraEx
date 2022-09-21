import styled from 'styled-components';

const TodoListStyle = styled.div`
  padding-top: 10px;
  border-top: 1px solid #98989873;
  width: 100%;
`;

const TodoItem = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 6px;
  border-bottom: 1px solid #98989873;
`;

const TodoCheckInput = styled.input`
  width: 20px;
  height: 20px;
`;

const TodoText = styled.p`
  font-size: 16px;
  text-align: left;
  word-break: break-all;
  flex: 1;
  padding: 0 14px;
  opacity: ${(props) => (props.donTask ? '0.6' : '1')}; ;
`;

const TodoGroupButton = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 4px;
  width: 80px;
`;

const TodoItemButton = styled.button`
  outline: none;
  border: none;
  padding: 4px;
  background-color: transparent;
  cursor: pointer;
  i {
    font-size: 26px;
    color: ${(props) => (props.colorIcon ? props.colorIcon : '#fff')};
  }
`;

const TodoNoTask = styled.p`
  font-size: 16px;
  text-align: center;
  padding: 10px 8px;
`;

export { TodoText, TodoGroupButton, TodoItemButton, TodoListStyle, TodoItem, TodoNoTask, TodoCheckInput };
