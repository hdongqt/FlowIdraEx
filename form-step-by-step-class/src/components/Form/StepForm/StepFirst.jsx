import React, { PureComponent } from 'react';
import {
  FormGroup,
  FormLabel,
  FormStyle,
  TextInput,
  ButtonGroupStep,
  FormButton,
  FormMessageError,
  NumberInput,
} from './Form.style';

export default class StepFirst extends PureComponent {
  state = {
    errorMessage: {
      firstname: '',
      age: '',
      lastname: '',
    },
  };

  onChange = (e) => {
    this.props.onChangeValueInput(e.target.name, e.target.value);
    this.setState({ errorMessage: { ...this.state.errorMessage, [e.target.name]: '' } });
  };

  onClickNextStep = () => {
    //validator
    let error = this.state.errorMessage;
    if (!this.props.formData.firstname) {
      error = { ...error, firstname: 'First name is required !' };
    }
    if (!this.props.formData.lastname) {
      error = { ...error, lastname: 'Last name is required !' };
    }
    if (!this.props.formData.age || this.props.formData.age < 0 || this.props.formData.age > 180) {
      error = { ...error, age: 'Please enter valid age !' };
    }

    //action
    if (Object.values(error).some((mess) => mess.length > 0)) {
      this.setState({ errorMessage: error });
    } else {
      this.props.onClickNext();
    }
  };
  render() {
    const { errorMessage } = this.state;
    const { formData } = this.props;
    return (
      <>
        <FormStyle>
          <FormGroup className="form-group">
            <FormLabel>First name:</FormLabel>
            <TextInput type="text" name="firstname" onChange={(e) => this.onChange(e)} value={formData.firstname} />
            {errorMessage.firstname && <FormMessageError>{errorMessage.firstname}</FormMessageError>}
          </FormGroup>
          <FormGroup className="form-group">
            <FormLabel>Last name:</FormLabel>
            <TextInput type="text" name="lastname" onChange={(e) => this.onChange(e)} value={formData.lastname} />
            {errorMessage.lastname && <FormMessageError>{errorMessage.lastname}</FormMessageError>}
          </FormGroup>
          <FormGroup className="form-group">
            <FormLabel>Age:</FormLabel>
            <NumberInput type="number" name="age" onChange={(e) => this.onChange(e)} value={formData.age} />
            {errorMessage.age && <FormMessageError>{errorMessage.age}</FormMessageError>}
          </FormGroup>
        </FormStyle>
        <ButtonGroupStep>
          <FormButton
            onClick={() => {
              this.onClickNextStep();
            }}
          >
            Next
          </FormButton>
        </ButtonGroupStep>
      </>
    );
  }
}
