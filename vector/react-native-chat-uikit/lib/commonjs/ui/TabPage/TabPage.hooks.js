"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useHeaderStartScrolling = exports.calculateIndex = void 0;
exports.useTabPageAPI = useTabPageAPI;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const calculateIndex = params => {
  const {
    width,
    contentOffsetX
  } = params;
  if (Number.isInteger(width) && Number.isInteger(contentOffsetX)) {
    return Math.floor(contentOffsetX / width);
  } else {
    const w = Math.round(width);
    const c = Math.round(contentOffsetX);
    return Math.round(c / w);
  }
};
exports.calculateIndex = calculateIndex;
const useHeaderStartScrolling = (count, headerRef, initIndex) => {
  const currentIndex = React.useRef(initIndex ?? 0);
  return {
    headerStartScrolling: (width, x) => {
      const index = calculateIndex({
        width: width,
        contentOffsetX: x
      });
      const current = index;
      const pre = currentIndex.current;
      const c = Math.abs(current - pre);
      currentIndex.current = current;
      if (current > pre) {
        if (current < count) {
          var _headerRef$current;
          headerRef === null || headerRef === void 0 ? void 0 : (_headerRef$current = headerRef.current) === null || _headerRef$current === void 0 ? void 0 : _headerRef$current.toRight(c);
        }
      } else if (current < pre) {
        if (current >= 0) {
          var _headerRef$current2;
          headerRef === null || headerRef === void 0 ? void 0 : (_headerRef$current2 = headerRef.current) === null || _headerRef$current2 === void 0 ? void 0 : _headerRef$current2.toLeft(c);
        }
      }
    }
  };
};
exports.useHeaderStartScrolling = useHeaderStartScrolling;
function useTabPageAPI(props, ref) {
  const {
    header,
    width: initWidth,
    initIndex = 0
  } = props;
  const {
    HeaderProps
  } = header;
  const {
    titles: headerTitles
  } = HeaderProps;
  const headerRef = React.useRef({});
  const bodyRef = React.useRef({});
  const count = headerTitles.length;
  const {
    width: winWidth
  } = (0, _reactNative.useWindowDimensions)();
  const width = initWidth ?? winWidth;
  const {
    headerStartScrolling
  } = useHeaderStartScrolling(count, headerRef, initIndex);
  React.useImperativeHandle(ref, () => {
    return {
      changeIndex: (index, animated) => {
        var _bodyRef$current;
        (_bodyRef$current = bodyRef.current) === null || _bodyRef$current === void 0 ? void 0 : _bodyRef$current.scrollTo(index, animated);
        headerStartScrolling(width, width * index);
      }
    };
  }, [headerStartScrolling, width]);
  return {
    headerRef,
    bodyRef,
    headerStartScrolling
  };
}
//# sourceMappingURL=TabPage.hooks.js.map