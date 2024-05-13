"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListIndex = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _theme = require("../../theme");
var _Text = require("../../ui/Text");
var _ListIndex = require("./ListIndex.const");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * List Index Component.
 *
 * This component is mainly used with alphabetical lists.
 */
const ListIndex = props => {
  const {
    indexTitles,
    onIndexSelected,
    indexContainerStyle,
    fontContainerStyle,
    isVisibleLetter = false
  } = props;
  const ref = React.useRef(null);
  const offsetRef = React.useRef(0);
  const maxIndex = indexTitles.length - 1;
  const [currentIndex, setCurrentIndex] = React.useState();
  const [currentTitle, setCurrentTitle] = React.useState();
  const _onIndexSelected = index => {
    var _indexTitles$_index;
    let _index = index;
    if (index < 0) {
      _index = 0;
    } else if (index > maxIndex) {
      _index = maxIndex;
    }
    setCurrentIndex(_index);
    setCurrentTitle((_indexTitles$_index = indexTitles[_index]) === null || _indexTitles$_index === void 0 ? void 0 : _indexTitles$_index[0]);
    onIndexSelected === null || onIndexSelected === void 0 ? void 0 : onIndexSelected(_index);
  };
  const {
    delayExecTask
  } = (0, _hook.useDelayExecTask)(500, () => {
    setCurrentIndex(undefined);
    setCurrentTitle(undefined);
  });
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    bg: {
      light: colors.primary[5],
      dark: colors.primary[6]
    },
    fg: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    },
    fg2: {
      light: colors.neutral[5],
      dark: colors.neutral[6]
    }
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactNative.View, {
    ref: ref,
    style: [{
      position: 'absolute',
      right: 2
    }, indexContainerStyle],
    onLayout: _e => {
      var _ref$current;
      // offsetRef.current = e.nativeEvent.layout.y;
      (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.measure((_x, _y, _width, _height, _pageX, pageY) => {
        offsetRef.current = pageY;
      });
    },
    onTouchMove: e => {
      const y = e.nativeEvent.pageY;
      const index = Math.floor((y - offsetRef.current) / _ListIndex.g_index_alphabet_size);
      _onIndexSelected(index);
    },
    onMoveShouldSetResponder: () => {
      return true;
    },
    onTouchEnd: e => {
      const y = e.nativeEvent.pageY;
      const index = Math.floor((y - offsetRef.current) / _ListIndex.g_index_alphabet_size);
      _onIndexSelected(index);
      delayExecTask();
    }
  }, indexTitles.map((section, index) => /*#__PURE__*/React.createElement(_reactNative.View, {
    key: index,
    style: {
      height: _ListIndex.g_index_alphabet_size,
      width: _ListIndex.g_index_alphabet_size,
      backgroundColor: currentIndex === index ? getColor('bg') : undefined,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: _ListIndex.g_index_alphabet_size
    }
  }, /*#__PURE__*/React.createElement(_Text.Text, {
    paletteType: 'label',
    textType: 'extraSmall',
    style: {
      color: currentIndex === index ? getColor('fg') : getColor('fg2')
    }
  }, section[0])))), currentTitle && isVisibleLetter === true ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [_reactNative.StyleSheet.absoluteFill, {
      justifyContent: 'center',
      alignItems: 'center'
    }, fontContainerStyle],
    pointerEvents: 'none'
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      backgroundColor: 'grey',
      height: _ListIndex.g_thumb_alphabet_size,
      width: _ListIndex.g_thumb_alphabet_size,
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(_Text.Text, {
    style: {
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 50,
      color: 'white'
    }
  }, currentTitle))) : null);
};
exports.ListIndex = ListIndex;
//# sourceMappingURL=ListIndex.js.map