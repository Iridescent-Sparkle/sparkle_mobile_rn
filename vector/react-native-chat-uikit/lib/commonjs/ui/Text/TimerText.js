"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimerText = TimerText;
var React = _interopRequireWildcard(require("react"));
var _Text = require("./Text");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function TimerText(props) {
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
  return /*#__PURE__*/React.createElement(_Text.Text, textStyle, value);
}
//# sourceMappingURL=TimerText.js.map