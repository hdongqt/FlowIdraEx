import React, { useState } from 'react';
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

const Form = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    address: '',
    gender: '',
  });

  const onClickNext = () => {
    setStep((prev) => prev + 1);
  };

  const onClickBack = () => {
    setStep((prev) => prev - 1);
  };
  const onChangeValueInput = (name, value) => {
    setForm({ ...form, [name]: value });
  };
  return (
    <FormContainer>
      <h2>Form register</h2>
      {(() => {
        switch (step) {
          case 2:
            return (
              <StepTwo
                onChangeValueInput={onChangeValueInput}
                formData={form}
                onClickNext={onClickNext}
                onClickBack={onClickBack}
              />
            );
          default:
            return (
              <StepFirst
                onChangeValueInput={onChangeValueInput}
                formData={form}
                onClickNext={onClickNext}
                onClickBack={onClickBack}
              />
            );
        }
      })()}
    </FormContainer>
  );
};

export default Form;
