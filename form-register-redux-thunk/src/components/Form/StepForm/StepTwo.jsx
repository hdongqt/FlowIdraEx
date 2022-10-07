import { useSelector, useDispatch } from "react-redux";
import { backStepForm, changeErrorMessage, changeValueForm, nextStepForm } from "../../../redux/actions/formAction";
import {
  FormGroup,
  FormLabel,
  FormStyle,
  TextInput,
  ButtonGroupStep,
  FormSelect,
  FormButton,
  FormMessageError,
} from "./Form.style";

const StepTwo = () => {
  const dispatch = useDispatch();
  const { errorMessage } = useSelector((state) => state.formValidate);
  const { form } = useSelector((state) => state.formData);

  const onChange = (e) => {
    dispatch(changeValueForm({ [e.target.name]: e.target.value }));
    dispatch(changeErrorMessage({ ...errorMessage, [e.target.name]: "" }));
  };
  const onClickNextStep = () => {
    //validator
    let error = errorMessage;
    if (!form.address) {
      error = { ...error, address: "First name is required !" };
    }
    if (!form.gender) {
      error = { ...error, gender: "Gender is required !" };
    }
    //action
    if (error.address || error.gender) {
      dispatch(changeErrorMessage(error));
    } else {
      dispatch(nextStepForm());
    }
  };

  return (
    <>
      <FormStyle>
        <FormGroup className="form-group">
          <FormLabel>Address:</FormLabel>
          <TextInput type="text" name="address" onChange={(e) => onChange(e)} value={form.address} />
          {errorMessage.address && <FormMessageError>{errorMessage.address}</FormMessageError>}
        </FormGroup>
        <FormGroup className="form-group">
          <FormLabel>Gender</FormLabel>
          <FormSelect name="gender" onChange={(e) => onChange(e)} value={form.gender}>
            <option value="">Choose Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </FormSelect>
          {errorMessage.gender && <FormMessageError>{errorMessage.gender}</FormMessageError>}
        </FormGroup>
        <ButtonGroupStep>
          <FormButton type="button" onClick={() => dispatch(backStepForm())}>
            Back
          </FormButton>
          <FormButton type="button" onClick={() => onClickNextStep()}>
            Next
          </FormButton>
        </ButtonGroupStep>
      </FormStyle>
    </>
  );
};

export default StepTwo;
