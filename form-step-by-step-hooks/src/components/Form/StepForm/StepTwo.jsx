import React, { useState } from 'react';
import { FormGroup, FormLabel, FormStyle, TextInput, FormSelect, FormMessageError } from './Form.style';
import { ButtonGroupStep, FormButton } from '../StepForm/Form.style';

const StepTwo = ({ onChangeValueInput, onClickBack, formData, onClickNext }) => {
  const [errorMessage, setErrorMessage] = useState({
    address: '',
    gender: '',
  });
  const onChange = (e) => {
    onChangeValueInput(e.target.name, e.target.value);
    setErrorMessage({ ...errorMessage, [e.target.name]: '' });
  };

  const onClickBackStep = () => {
    onClickBack();
  };

  const onClickNextStep = () => {
    let error = errorMessage;
    if (!formData.address) {
      error = { ...error, address: 'First name is required !' };
    }
    if (!formData.gender) {
      error = { ...error, gender: 'First name is required !' };
    }
    //action
    if (Object.values(error).some((mess) => mess.length > 0)) {
      setErrorMessage(error);
    } else {
      onClickNext();
    }
  };

  return (
    <>
      <FormStyle>
        <FormGroup className="form-group">
          <FormLabel>Address:</FormLabel>
          <TextInput type="text" name="address" onChange={(e) => onChange(e)} value={formData.address} />
          {errorMessage.address && <FormMessageError>{errorMessage.address}</FormMessageError>}
        </FormGroup>
        <FormGroup className="form-group">
          <FormLabel>Gender</FormLabel>
          <FormSelect name="gender" onChange={(e) => onChange(e)}>
            <option value="">Choose Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </FormSelect>
          {errorMessage.gender && <FormMessageError>{errorMessage.gender}</FormMessageError>}
        </FormGroup>
      </FormStyle>
      <ButtonGroupStep>
        <FormButton onClick={() => onClickBackStep()}>Back</FormButton>
        <FormButton onClick={() => onClickNextStep()} isSubmit={true}>
          Submit
        </FormButton>
      </ButtonGroupStep>
    </>
  );
};

export default StepTwo;
