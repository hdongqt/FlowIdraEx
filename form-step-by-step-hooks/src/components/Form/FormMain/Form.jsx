import React, { useState } from 'react';
import styled from 'styled-components';
import StepFirst from '../StepForm/StepFirst';
import StepTwo from '../StepForm/StepTwo';
import Swal from 'sweetalert2';

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
    age: 0,
    address: '',
    gender: '',
  });

  const onClickNext = () => {
    if (step < 2) {
      setStep((prev) => prev + 1);
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `
              fullname: ${form.firstname} ${form.lastname},
              age: ${form.age},
              lastname: ${form.address},
              gender: ${form.gender}
              `,
      });
    }
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
