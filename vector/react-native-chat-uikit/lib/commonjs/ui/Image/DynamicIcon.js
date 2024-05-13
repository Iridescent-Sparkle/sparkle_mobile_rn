"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicIcon = DynamicIcon;
exports.gFrameInterval = void 0;
var React = _interopRequireWildcard(require("react"));
var _Image = require("./Image");
var _Image2 = require("./Image.hooks");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const gFrameInterval = 330; // ms
exports.gFrameInterval = gFrameInterval;
function DynamicIcon(props) {
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
  const [source, setSource] = React.useState((0, _Image2.getIconSource)(names[initialIndex], resolution));
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
      setSource((0, _Image2.getIconSource)(names[initialIndex], resolution));
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
      setSource((0, _Image2.getIconSource)(names[index], resolution));
    }, frameInterval);
  }, [initialIndex, frameInterval, names, resolution, loopCount, onPlayFinished, stop]);
  return /*#__PURE__*/React.createElement(_Image.Image, _extends({
    source: source ?? 0,
    style: [style]
  }, others));
}
//# sourceMappingURL=DynamicIcon.js.map