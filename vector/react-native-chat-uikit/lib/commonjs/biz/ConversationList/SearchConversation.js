"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchConversation = SearchConversation;
var React = _interopRequireWildcard(require("react"));
var _ListSearch = require("../ListSearch");
var _SearchConversation = require("./SearchConversation.hooks");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function SearchConversation(props) {
  const {
    onCancel,
    containerStyle
  } = props;
  const {
    data,
    onClicked
  } = (0, _SearchConversation.useSearchConversation)(props);
  return /*#__PURE__*/React.createElement(_ListSearch.ListSearch, {
    initData: data,
    onCancel: onCancel,
    containerStyle: containerStyle,
    searchType: 'conv-list',
    onClicked: onClicked
  });
}
//# sourceMappingURL=SearchConversation.js.map