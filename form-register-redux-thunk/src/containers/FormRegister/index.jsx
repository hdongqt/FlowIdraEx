import { useSelector } from "react-redux";
import styled from "styled-components";
import StepFirst from "../../components/StepForm/StepFirst";
import StepTwo from "../../components/StepForm/StepTwo";
import StepLast from "../../components/StepForm/StepLast";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding-top: 100px;
`;

const FormRegister = () => {
  const { step } = useSelector((state) => state.formValidate);

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

export default FormRegister;
