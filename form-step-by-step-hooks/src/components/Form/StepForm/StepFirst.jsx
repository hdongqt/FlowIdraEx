import React, { useState } from 'react';
import { FormGroup, FormLabel, FormStyle, TextInput } from './Form.style';
import { ButtonGroupStep, FormButton, FormMessageError } from '../StepForm/Form.style';

const StepFirst = ({ onChangeValueInput, formData, onClickNext, onClickBack }) => {
  const [errorMessage, setErrorMessage] = useState({
    firstname: '',
    lastname: '',
  });
  const onChange = (e) => {
    onChangeValueInput(e.target.name, e.target.value);
    setErrorMessage({ ...errorMessage, [e.target.name]: '' });
  };

  const onClickNextStep = () => {
    //validator
    let error = errorMessage;
    if (!formData.firstname) {
      error = { ...error, firstname: 'First name is required !' };
    }
    if (!formData.lastname) {
      error = { ...error, lastname: 'Last name is required !' };
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
          <FormLabel>First name:</FormLabel>
          <TextInput type="text" name="firstname" onChange={(e) => onChange(e)} value={formData.firstname} />
          {errorMessage.firstname && <FormMessageError>{errorMessage.firstname}</FormMessageError>}
        </FormGroup>
        <FormGroup className="form-group">
          <FormLabel>Last name:</FormLabel>
          <TextInput type="text" name="lastname" onChange={(e) => onChange(e)} value={formData.lastname} />
          {errorMessage.lastname && <FormMessageError>{errorMessage.lastname}</FormMessageError>}
        </FormGroup>
      </FormStyle>
      <ButtonGroupStep>
        <FormButton
          onClick={() => {
            onClickNextStep();
          }}
        >
          Next
        </FormButton>
      </ButtonGroupStep>
    </>
  );
};

export default StepFirst;
