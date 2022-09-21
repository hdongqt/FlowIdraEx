import React, { PureComponent } from 'react';
import * as ADD from './AddTodo.style';

export default class AddTodo extends PureComponent {
  state = {
    title: '',
    todoEdit: null,
  };

  onChangeInput = (event) => {
    this.setState({ title: event.target.value });
  };

  handelClickAddEditTodo = () => {
    const { todoEdit, title } = this.state;
    if (this.state.title) {
      if (todoEdit) {
        const todo = { ...todoEdit, title: title };
        this.props.handelEditTodo(todo);
        this.setState({
          title: '',
          todoEdit: null,
        });
      } else {
        this.props.addTodo(this.state.title);
        this.setState({
          title: '',
        });
      }
    } else {
      alert('Please enter a title for the task');
    }
  };

  onClickClearEdit = () => {
    this.props.clearEditTodo();
    this.setState({
      title: '',
      todoEdit: null,
    });
  };

  componentDidUpdate(prevProps) {
    if (this.state.todoEdit !== this.props.todoEdit) {
      console.log('changed props todoEdit');
      this.setState({ title: this.props.todoEdit.title, todoEdit: this.props.todoEdit });
    }
  }

  render() {
    const { todoEdit } = this.state;
    return (
      <ADD.AddTodoStyle>
        <ADD.AddTodoInput
          placeholder="Please enter a title for the task..."
          onChange={(e) => this.onChangeInput(e)}
          value={this.state.title}
        ></ADD.AddTodoInput>
        {todoEdit && (
          <ADD.ClearEditButton onClick={() => this.onClickClearEdit()}>
            <i className="las la-redo-alt"></i>
          </ADD.ClearEditButton>
        )}
        <ADD.AddTodoButton onClick={() => this.handelClickAddEditTodo()}>{todoEdit ? 'Edit' : 'Add'}</ADD.AddTodoButton>
      </ADD.AddTodoStyle>
    );
  }
}
