"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlatListFactory = FlatListFactory;
exports._FlatList = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const _FlatList = (props, ref) => {
  const {
    ListErrorComponent,
    ListLoadingComponent
  } = props;
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement(_reactNative.FlatList, _extends({
    ref: ref
  }, props)), (0, _hook.getElement)(ListErrorComponent), (0, _hook.getElement)(ListLoadingComponent));
};

/**
 * @example
 *
 * export const FlatList = FlatListFactory<{ id: string }>();
 * export function FlatList() {}
 * @returns
 */
exports._FlatList = _FlatList;
function FlatListFactory() {
  return /*#__PURE__*/React.forwardRef(_FlatList);
}
//# sourceMappingURL=FlatList.js.map