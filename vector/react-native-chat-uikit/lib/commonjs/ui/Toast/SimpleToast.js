"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleToast = SimpleToast;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _theme = require("../../theme");
var _utils = require("../../utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function SimpleToast(props) {
  const {
    propsRef,
    timeout = 3000
  } = props;
  const tasks = React.useRef(new _utils.Queue()).current;
  const preTask = React.useRef(undefined);
  const curTask = React.useRef(undefined);
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    bg: {
      light: colors.barrage.onLight[3],
      dark: colors.barrage.onDark[3]
    },
    text: {
      light: colors.neutral[98],
      dark: colors.barrage.onDark[8]
    }
  });
  const [text, setText] = React.useState(undefined);
  const [isShow, setIsShow] = React.useState(false);
  const execTask = () => {
    if (curTask.current === undefined) {
      const task = tasks.dequeue();
      if (task) {
        curTask.current = task;
        execAnimation(() => {
          execTask();
        });
      } else {
        setIsShow(false);
      }
    }
  };
  const execAnimation = onFinished => {
    var _curTask$current, _curTask$current2;
    setIsShow(true);
    setText(((_curTask$current = curTask.current) === null || _curTask$current === void 0 ? void 0 : _curTask$current.message) ?? '');
    (0, _utils.timeoutTask)(((_curTask$current2 = curTask.current) === null || _curTask$current2 === void 0 ? void 0 : _curTask$current2.timeout) ?? timeout, () => {
      preTask.current = curTask.current;
      curTask.current = undefined;
      onFinished === null || onFinished === void 0 ? void 0 : onFinished();
    });
  };
  if (propsRef.current) {
    propsRef.current.show = task => {
      tasks.enqueue(task);
      execTask();
    };
  }
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [_reactNative.StyleSheet.absoluteFill, {
      justifyContent: 'center',
      alignItems: 'center',
      top: '70%',
      display: isShow === true ? 'flex' : 'none'
    }],
    pointerEvents: 'none'
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: getColor('bg')
    }
  }, /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: {
      maxWidth: '50%',
      color: getColor('text'),
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 18
    }
  }, text)));
}
//# sourceMappingURL=SimpleToast.js.map