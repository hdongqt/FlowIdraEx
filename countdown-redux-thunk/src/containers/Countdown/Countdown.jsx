import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { decrease, setNumber } from "../../actions/countdownAction";

import { CountdownContainer, CountdownAction } from "./Countdown.style";

const Countdown = () => {
  const [numberCountDown, setNumberCountdown] = useState(0);
  const number = useSelector((state) => state.countdown.number);
  const dispatch = useDispatch();
  const onSubmit = () => {
    if (numberCountDown) dispatch(setNumber(numberCountDown));
  };

  useEffect(() => {
    if (number > 0) {
      let timer = setInterval(() => {
        dispatch(decrease());
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [dispatch, number]);
  return (
    <CountdownContainer>
      <CountdownAction>
        <input
          placeholder="enter number"
          type="number"
          value={numberCountDown}
          onChange={(e) => setNumberCountdown(+e.target.value)}
        />
        <button onClick={() => onSubmit()}>Countdown</button>
      </CountdownAction>

      <div>{number}</div>
    </CountdownContainer>
  );
};

export default Countdown;
