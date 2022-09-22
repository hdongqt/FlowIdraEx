import React, { useState } from 'react';
import {
  FormGroup,
  FormLabel,
  FormStyle,
  NumberInput,
  TextInput,
  ButtonGroupStep,
  FormButton,
  FormMessageError,
} from './Form.style';

const StepFirst = ({ onChangeValueInput, formData, onClickNext, onClickBack }) => {
  const [errorMessage, setErrorMessage] = useState({
    firstname: '',
    lastname: '',
    age: '',
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
    if (!formData.age || formData.age < 0 || formData.age > 180) {
      error = { ...error, age: 'Please enter valid age !' };
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
        <FormGroup className="form-group">
          <FormLabel>Age:</FormLabel>
          <NumberInput type="number" name="age" onChange={(e) => onChange(e)} value={formData.age} />
          {errorMessage.age && <FormMessageError>{errorMessage.age}</FormMessageError>}
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
