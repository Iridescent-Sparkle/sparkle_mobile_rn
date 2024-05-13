"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListSearch = ListSearch;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _FlatList = require("../../ui/FlatList");
var _Placeholder = require("../Placeholder");
var _Search = require("../Search");
var _ListSearch = require("./ListSearch.hooks");
var _ListSearch2 = require("./ListSearch.item");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ListSearch(props) {
  const {
    onCancel,
    containerStyle,
    ItemRender,
    searchType
  } = props;
  const FlatList = React.useMemo(() => (0, _FlatList.FlatListFactory)(), []);
  const ListSearchItemMemo = React.useMemo(() => ItemRender ? /*#__PURE__*/React.memo(ItemRender) : /*#__PURE__*/React.memo(_ListSearch2.ListSearchItem), [ItemRender]);
  const [value, setValue] = React.useState('');
  const {
    ref,
    data,
    deferSearch,
    onClicked
  } = (0, _ListSearch.useListSearch)(props);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [{
      flexGrow: 1
    }, containerStyle]
  }, /*#__PURE__*/React.createElement(_Search.Search, {
    onCancel: onCancel,
    onChangeText: v => {
      setValue(v);
      deferSearch === null || deferSearch === void 0 ? void 0 : deferSearch(v);
    },
    value: value
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(FlatList, {
    ref: ref,
    style: {
      flexGrow: 1
    },
    contentContainerStyle: {
      flexGrow: 1
    },
    data: data,
    renderItem: info => {
      const {
        item
      } = info;
      return /*#__PURE__*/React.createElement(ListSearchItemMemo, _extends({}, item, {
        onClicked: onClicked,
        searchType: searchType
      }));
    },
    keyExtractor: item => {
      return item.id;
    },
    ListEmptyComponent: _Placeholder.EmptyPlaceholder
  })));
}
//# sourceMappingURL=ListSearch.js.map