import React, { PureComponent } from 'react';
import Swal from 'sweetalert2';
import { FormGroup, FormLabel, FormStyle, TextInput, FormSelect, FormMessageError } from './Form.style';
import { ButtonGroupStep, FormButton } from '../StepForm/Form.style';

export default class StepTwo extends PureComponent {
  state = {
    errorMessage: {
      firstname: '',
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
    if (!this.props.formData.address) {
      error = { ...error, address: 'Address is required !' };
    }
    if (!this.props.formData.gender) {
      error = { ...error, gender: 'Gender is required !' };
    }
    //action
    if (Object.values(error).some((mess) => mess.length > 0)) {
      this.setState({ errorMessage: error });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `fullname: ${this.props.formData.firstname} ${this.props.formData.lastname},
              lastname: ${this.props.formData.address},
              gender: ${this.props.formData.gender}
              `,
      });
    }
  };
  render() {
    const { errorMessage } = this.state;
    const { formData } = this.props;
    return (
      <>
        <FormStyle>
          <FormGroup className="form-group">
            <FormLabel>Address:</FormLabel>
            <TextInput type="text" name="address" onChange={(e) => this.onChange(e)} value={formData.address} />
            {errorMessage.address && <FormMessageError>{errorMessage.address}</FormMessageError>}
          </FormGroup>
          <FormGroup className="form-group">
            <FormLabel>Gender</FormLabel>
            <FormSelect name="gender" onChange={(e) => this.onChange(e)}>
              <option value="">Choose Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </FormSelect>
            {errorMessage.gender && <FormMessageError>{errorMessage.gender}</FormMessageError>}
          </FormGroup>
        </FormStyle>
        <ButtonGroupStep>
          <FormButton onClick={() => this.props.onClickBack()}>Back</FormButton>
          <FormButton onClick={() => this.onClickNextStep()} isSubmit={true}>
            Submit
          </FormButton>
        </ButtonGroupStep>
      </>
    );
  }
}
