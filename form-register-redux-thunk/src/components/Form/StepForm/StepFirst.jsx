import {
  FormGroup,
  FormLabel,
  FormStyle,
  NumberInput,
  TextInput,
  ButtonGroupStep,
  FormButton,
  FormMessageError,
} from "./Form.style";
import { useSelector, useDispatch } from "react-redux";
import { changeErrorMessage, changeValueForm, nextStepForm } from "../../../redux/actions/formAction";
const StepFirst = () => {
  const dispatch = useDispatch();
  const { errorMessage } = useSelector((state) => state.formValidate);
  const { form } = useSelector((state) => state.formData);

  const onChange = (e) => {
    dispatch(changeValueForm({ [e.target.name]: e.target.value }));
    console.log(e.target.name);
    dispatch(changeErrorMessage({ ...errorMessage, [e.target.name]: "" }));
  };

  const onClickNextStep = () => {
    //validator
    let error = errorMessage;
    if (!form.firstname) {
      error = { ...error, firstname: "First name is required !" };
    }
    if (!form.lastname) {
      error = { ...error, lastname: "Last name is required !" };
    }
    if (!form.age || form.age < 0 || form.age > 180) {
      error = { ...error, age: "Please enter valid age !" };
    }
    //action
    if (error.firstname || error.lastname || error.age) {
      dispatch(changeErrorMessage(error));
    } else {
      dispatch(nextStepForm());
    }
  };

  return (
    <>
      <FormStyle>
        <FormGroup className="form-group">
          <FormLabel>First name:</FormLabel>
          <TextInput type="text" name="firstname" onChange={(e) => onChange(e)} value={form.firstname} />
          {errorMessage.firstname && <FormMessageError>{errorMessage.firstname}</FormMessageError>}
        </FormGroup>
        <FormGroup className="form-group">
          <FormLabel>Last name:</FormLabel>
          <TextInput type="text" name="lastname" onChange={(e) => onChange(e)} value={form.lastname} />
          {errorMessage.lastname && <FormMessageError>{errorMessage.lastname}</FormMessageError>}
        </FormGroup>
        <FormGroup className="form-group">
          <FormLabel>Age:</FormLabel>
          <NumberInput type="number" name="age" onChange={(e) => onChange(e)} value={form.age} />
          {errorMessage.age && <FormMessageError>{errorMessage.age}</FormMessageError>}
        </FormGroup>
        <ButtonGroupStep>
          <FormButton type="button" onClick={() => onClickNextStep()}>
            Next
          </FormButton>
        </ButtonGroupStep>
      </FormStyle>
    </>
  );
};

export default StepFirst;
