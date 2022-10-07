import styled from "styled-components";
import StepFirst from "../StepForm/StepFirst";
import StepTwo from "../StepForm/StepTwo";
import { useSelector } from "react-redux";
import StepLast from "../StepForm/StepLast";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding-top: 100px;
`;

const Form = () => {
  const { step } = useSelector((state) => state.formValidate);
  const { formSubmitted } = useSelector((state) => state.formData);

  return (
    <FormContainer>
      <h2>Form register</h2>
      {(() => {
        switch (step) {
          case 2:
            return <StepTwo />;
          case 3:
            return <StepLast />;
          default:
            return <StepFirst />;
        }
      })()}
    </FormContainer>
  );
};

export default Form;
