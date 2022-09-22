import React, { PureComponent } from 'react';
import styled from 'styled-components';
import StepFirst from '../StepForm/StepFirst';
import StepTwo from '../StepForm/StepTwo';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding-top: 100px;
`;

export default class Form extends PureComponent {
  state = {
    step: 1,
    form: {
      firstname: '',
      lastname: '',
      address: '',
      gender: '',
    },
  };

  onClickNext = () => {
    this.setState({
      step: this.state.step + 1,
    });
  };

  onClickBack = () => {
    this.setState({
      step: this.state.step - 1,
    });
  };
  onChangeValueInput = (name, value) => {
    this.setState({
      form: { ...this.state.form, [name]: value },
    });
  };

  render() {
    return (
      <FormContainer>
        <h2>Form register</h2>
        {(() => {
          switch (this.state.step) {
            case 2:
              return (
                <StepTwo
                  onChangeValueInput={this.onChangeValueInput}
                  formData={this.state.form}
                  onClickNext={this.onClickNext}
                  onClickBack={this.onClickBack}
                />
              );
            default:
              return (
                <StepFirst
                  onChangeValueInput={this.onChangeValueInput}
                  formData={this.state.form}
                  onClickNext={this.onClickNext}
                  onClickBack={this.onClickBack}
                />
              );
          }
        })()}
      </FormContainer>
    );
  }
}
