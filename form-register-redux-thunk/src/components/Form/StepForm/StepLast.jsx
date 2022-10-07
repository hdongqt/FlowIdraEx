import { FormGroup, FormLabel, FormStyle, TextInput, FormMessageError } from "./Form.style";
import { ButtonGroupStep, FormButton } from "../StepForm/Form.style";
import { useSelector, useDispatch } from "react-redux";
import { backStepForm, changeErrorMessage, changeValueForm, submitForm } from "../../../redux/actions/formAction";

const StepLast = () => {
  const dispatch = useDispatch();
  const { errorMessage } = useSelector((state) => state.formValidate);
  const { form, isLoading } = useSelector((state) => state.formData);

  const onChange = (e) => {
    dispatch(changeValueForm({ [e.target.name]: e.target.value }));
    dispatch(changeErrorMessage({ ...errorMessage, [e.target.name]: "" }));
  };

  const onClickNextStep = () => {
    let error = errorMessage;
    // eslint-disable-next-line
    const phoneFormat = /^[0-9\+]{1,}[0-9\-]{3,15}$/;
    if (!form.phone || !phoneFormat.test(form.phone)) {
      error = { ...error, phone: "Phone is not valid !" };
    }
    // eslint-disable-next-line
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!form.email || !mailformat.test(form.email)) {
      error = { ...error, email: "Email is not valid !" };
    }
    //action
    if (Object.values(error).some((mess) => mess.length > 0)) {
      dispatch(changeErrorMessage(error));
    } else {
      dispatch(submitForm(form));
    }
  };

  return (
    <>
      <FormStyle>
        <FormGroup className="form-group">
          <FormLabel>Phone:</FormLabel>
          <TextInput type="tel" name="phone" onChange={(e) => onChange(e)} value={form.phone} />
          {errorMessage.phone && <FormMessageError>{errorMessage.phone}</FormMessageError>}
        </FormGroup>
        <FormGroup className="form-group">
          <FormLabel>Email:</FormLabel>
          <TextInput type="email" name="email" onChange={(e) => onChange(e)} value={form.email} />
          {errorMessage.email && <FormMessageError>{errorMessage.email}</FormMessageError>}
        </FormGroup>
        <ButtonGroupStep>
          <FormButton type="button" onClick={() => dispatch(backStepForm())}>
            Back
          </FormButton>
          <FormButton type="button" onClick={() => onClickNextStep()} isSubmit={true}>
            {isLoading && (
              <span className="btn-icon-loading">
                <i className="las la-spinner"></i>
              </span>
            )}
            Submit
          </FormButton>
        </ButtonGroupStep>
      </FormStyle>
    </>
  );
};

export default StepLast;
