"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageListMemo = exports.MessageList = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _theme = require("../../theme");
var _Alert = require("../../ui/Alert");
var _FlatList = require("../../ui/FlatList");
var _BottomSheetMenu = require("../BottomSheetMenu");
var _MessageReport = require("../MessageReport");
var _Placeholder = require("../Placeholder");
var _MessageList = require("./MessageList.hooks");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * Message List Component.
 *
 * This component can display sent and received messages, display historical messages, play language messages, preview pictures, video messages, download files, and customize behaviors and styles such as previewing pictures, previewing videos, and downloading documents. Custom messages can be added and more. Usually used in conjunction with the `MessageInput` component.
 */
const MessageList = /*#__PURE__*/React.forwardRef(function (props, ref) {
  const FlatList = React.useMemo(() => (0, _FlatList.FlatListFactory)(), []);
  const {
    containerStyle,
    onClicked
  } = props;
  const {
    ref: flatListRef,
    data,
    refreshing,
    onRefresh,
    onMore,
    viewabilityConfig,
    onViewableItemsChanged,
    listState,
    menuRef,
    alertRef,
    onRequestCloseMenu,
    onClickedItem,
    onLongPressItem,
    inverted,
    maxListHeight,
    setMaxListHeight,
    reachedThreshold,
    reportRef,
    reportMessage,
    reportData,
    onClickedItemAvatar,
    onClickedItemQuote,
    onClickedItemState,
    ListItemRender,
    listItemRenderProps,
    scrollEventThrottle,
    onMomentumScrollEnd,
    onScroll,
    onScrollBeginDrag,
    onScrollEndDrag,
    onLayout,
    bounces,
    onContentSizeChange,
    onRenderItem
  } = (0, _MessageList.useMessageList)(props, ref);
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    bg: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    }
  });
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [{
      backgroundColor: getColor('bg'),
      // flexGrow: 1,
      // flexShrink: 1,
      flex: 1
      // backgroundColor: 'blue',
    }, containerStyle],
    onTouchEnd: onClicked,
    onLayout: e => {
      setMaxListHeight(e.nativeEvent.layout.height);
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      // flexGrow: 1,
      // flexShrink: 1,
      // flex: 1,
      // maxListHeight: '80%',
      maxHeight: maxListHeight
      // backgroundColor: 'red',
    }
  }, /*#__PURE__*/React.createElement(FlatList, {
    ref: flatListRef,
    onLayout: onLayout,
    onContentSizeChange: onContentSizeChange
    // style={{ flexGrow: 1 }}
    // contentContainerStyle={{ flexGrow: 1 }}
    ,
    data: data,
    refreshing: refreshing,
    onRefresh: onRefresh,
    inverted: inverted,
    scrollEventThrottle: scrollEventThrottle,
    renderItem: info => {
      const {
        item,
        index
      } = info;
      onRenderItem(info);
      return /*#__PURE__*/React.createElement(ListItemRender, _extends({}, item, {
        index: index,
        onClicked: onClickedItem,
        onLongPress: onLongPressItem,
        onAvatarClicked: onClickedItemAvatar,
        onQuoteClicked: onClickedItemQuote,
        onStateClicked: onClickedItemState
      }, listItemRenderProps));
    },
    keyExtractor: item => {
      return item.id;
    },
    onEndReached: onMore,
    onEndReachedThreshold: reachedThreshold,
    viewabilityConfig: viewabilityConfig,
    onViewableItemsChanged: onViewableItemsChanged,
    onMomentumScrollEnd: onMomentumScrollEnd,
    onScroll: onScroll,
    onScrollEndDrag: onScrollEndDrag,
    onScrollBeginDrag: onScrollBeginDrag,
    bounces: bounces
    // !!! This effect does not work well when inserting the first element without scrolling.
    // maintainVisibleContentPosition={{
    //   minIndexForVisible: 0,
    //   autoscrollToTopThreshold: 10,
    // }}
    ,
    ListEmptyComponent: _Placeholder.EmptyPlaceholder,
    ListErrorComponent: listState === 'error' ? /*#__PURE__*/React.createElement(_Placeholder.ErrorPlaceholder, {
      onClicked: () => {
        onRefresh === null || onRefresh === void 0 ? void 0 : onRefresh();
      }
    }) : null,
    ListLoadingComponent: listState === 'loading' ? /*#__PURE__*/React.createElement(_Placeholder.LoadingPlaceholder, null) : null
  })), /*#__PURE__*/React.createElement(_BottomSheetMenu.BottomSheetNameMenu, {
    ref: menuRef,
    onRequestModalClose: onRequestCloseMenu
  }), /*#__PURE__*/React.createElement(_Alert.Alert, {
    ref: alertRef
  }), /*#__PURE__*/React.createElement(_MessageReport.BottomSheetMessageReport, {
    ref: reportRef,
    data: reportData,
    onReport: reportMessage
  }));
});
exports.MessageList = MessageList;
const MessageListMemo = /*#__PURE__*/React.memo(MessageList);
exports.MessageListMemo = MessageListMemo;
//# sourceMappingURL=MessageList.js.map