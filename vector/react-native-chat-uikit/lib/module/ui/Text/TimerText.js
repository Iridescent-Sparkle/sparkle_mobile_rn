import * as React from 'react';
import { Text } from './Text';
export function TimerText(props) {
  const {
    isIncrease,
    startValue,
    stopValue,
    propsRef,
    textStyle,
    onChanged
  } = props;
  const [value, setValue] = React.useState(startValue);
  const timerRef = React.useRef(null);
  if (propsRef !== null && propsRef !== void 0 && propsRef.current) {
    propsRef.current.start = () => {
      start();
    };
    propsRef.current.stop = () => {
      stop();
    };
    propsRef.current.reset = () => {
      setValue(startValue);
      onChanged === null || onChanged === void 0 ? void 0 : onChanged(startValue);
    };
  }
  const start = () => {
    timerRef.current = setInterval(() => {
      if (isIncrease === true) {
        setValue(v => {
          // onChanged?.(v + 1); // !!! Warning: Cannot update a component (`VoiceBar`) while rendering a different component (`TimerText`). To locate the bad setState() call inside `TimerText`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
          return v + 1;
        });
      } else {
        setValue(v => {
          // onChanged?.(v - 1);
          return v - 1;
        });
      }
    }, 1000);
  };
  const stop = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  React.useEffect(() => {
    return () => {
      stop();
    };
  }, []);
  React.useEffect(() => {
    if (value === stopValue) {
      stop();
    }
  }, [stopValue, value]);
  React.useEffect(() => {
    onChanged === null || onChanged === void 0 ? void 0 : onChanged(value);
  }, [onChanged, value]);
  return /*#__PURE__*/React.createElement(Text, textStyle, value);
}
//# sourceMappingURL=TimerText.js.map