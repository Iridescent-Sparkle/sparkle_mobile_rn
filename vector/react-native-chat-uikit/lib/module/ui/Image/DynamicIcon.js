function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { Image } from './Image';
import { getIconSource } from './Image.hooks';
export const gFrameInterval = 330; // ms

export function DynamicIcon(props) {
  const {
    propsRef,
    frameInterval = gFrameInterval,
    names,
    resolution = '',
    style,
    loopCount = -1,
    initialIndex = 0,
    onPlayStart,
    onPlayFinished,
    ...others
  } = props;
  const [source, setSource] = React.useState(getIconSource(names[initialIndex], resolution));
  const timerRef = React.useRef();
  if (propsRef !== null && propsRef !== void 0 && propsRef.current) {
    propsRef.current.startPlay = () => {
      onPlayStart === null || onPlayStart === void 0 ? void 0 : onPlayStart();
      start();
    };
    propsRef.current.stopPlay = () => {
      stop();
      onPlayFinished === null || onPlayFinished === void 0 ? void 0 : onPlayFinished();
    };
  }
  const stop = React.useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
      setSource(getIconSource(names[initialIndex], resolution));
    }
  }, [initialIndex, names, resolution]);
  const start = React.useCallback(() => {
    let index = initialIndex;
    let currentLoopCount = 0;
    timerRef.current = setInterval(() => {
      index++;
      ++currentLoopCount;
      if (index >= names.length) {
        if (loopCount !== -1) {
          if (currentLoopCount >= loopCount) {
            stop();
            onPlayFinished === null || onPlayFinished === void 0 ? void 0 : onPlayFinished();
            return;
          }
        }
        index = 0;
      }
      setSource(getIconSource(names[index], resolution));
    }, frameInterval);
  }, [initialIndex, frameInterval, names, resolution, loopCount, onPlayFinished, stop]);
  return /*#__PURE__*/React.createElement(Image, _extends({
    source: source ?? 0,
    style: [style]
  }, others));
}
//# sourceMappingURL=DynamicIcon.js.map