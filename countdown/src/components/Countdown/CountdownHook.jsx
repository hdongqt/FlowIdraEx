import React, { useEffect, useState } from 'react';
import { AppCountDown, Number, TitleHeading } from './Countdown.style';

const CountdownFunc = () => {
  const [count, setCount] = useState(10);
  useEffect(() => {
    const timer = setInterval(() => {
      if (count > 0) {
        setCount(count - 1);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [count]);

  return (
    <AppCountDown>
      <TitleHeading>Count down Functional Component</TitleHeading>
      <Number>{count}</Number>
    </AppCountDown>
  );
};

export default CountdownFunc;
