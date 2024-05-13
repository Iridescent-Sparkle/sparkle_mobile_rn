"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConversationList = ConversationList;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _theme = require("../../theme");
var _Alert = require("../../ui/Alert");
var _FlatList = require("../../ui/FlatList");
var _Avatar = require("../Avatar");
var _BottomSheetMenu = require("../BottomSheetMenu");
var _Placeholder = require("../Placeholder");
var _SearchStyle = require("../SearchStyle");
var _TopNavigationBar = require("../TopNavigationBar");
var _ConversationList = require("./ConversationList.hooks");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const FlatList = (0, _FlatList.FlatListFactory)();

/**
 * The conversation list component mainly consists of four parts, including navigation component, search style component, individual list item component, and list component. Supports displaying bottom menu components and warning components. The navigation bar component can be set to display or not, customize the style, or even replace it as a whole. The search style component supports whether to display and customize styles, and the individual list item component supports whether to display, add or replace any multiple components. List components support more property settings.
 */
function ConversationList(props) {
  const {
    containerStyle,
    navigationBarVisible,
    customNavigationBar,
    searchStyleVisible,
    customSearch,
    onClickedSearch
  } = props;
  const {
    data,
    refreshing,
    onRefresh,
    ref,
    onMore,
    viewabilityConfig,
    onViewableItemsChanged,
    listState,
    menuRef,
    onRequestCloseMenu,
    alertRef,
    avatarUrl,
    tr,
    onShowConversationListMoreActions,
    ListItemRender,
    propsFlatListProps
  } = (0, _ConversationList.useConversationList)(props);
  const {
    style,
    contentContainerStyle,
    refreshing: propsRefreshing,
    onRefresh: propsOnFresh,
    onEndReached: propsOnEndReached,
    viewabilityConfig: propsViewabilityConfig,
    onViewableItemsChanged: propsOnViewableItemsChanged,
    ...others
  } = propsFlatListProps ?? {};
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
      backgroundColor: getColor('bg')
    }, containerStyle]
  }, navigationBarVisible !== false ? customNavigationBar ? /*#__PURE__*/React.createElement(React.Fragment, null, customNavigationBar) : /*#__PURE__*/React.createElement(_TopNavigationBar.TopNavigationBar, {
    Left: /*#__PURE__*/React.createElement(_Avatar.Avatar, {
      url: avatarUrl,
      size: 32
    }),
    Right: _TopNavigationBar.TopNavigationBarRight,
    RightProps: {
      onClicked: onShowConversationListMoreActions,
      iconName: 'plus_in_circle'
    },
    Title: (0, _TopNavigationBar.TopNavigationBarTitle)({
      text: 'Chat'
    })
  }) : null, searchStyleVisible !== false ? customSearch ? /*#__PURE__*/React.createElement(React.Fragment, null, customSearch) : /*#__PURE__*/React.createElement(_SearchStyle.SearchStyle, {
    title: tr('search'),
    onPress: () => {
      if (listState === 'normal') {
        onClickedSearch === null || onClickedSearch === void 0 ? void 0 : onClickedSearch();
      }
    }
  }) : null, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(FlatList, _extends({
    ref: ref,
    style: [{
      flexGrow: 1
    }, style],
    contentContainerStyle: [{
      flexGrow: 1
    }, contentContainerStyle],
    data: data,
    refreshing: propsRefreshing ?? refreshing,
    onRefresh: propsOnFresh ?? onRefresh,
    renderItem: info => {
      const {
        item
      } = info;
      return /*#__PURE__*/React.createElement(ListItemRender, item);
    },
    keyExtractor: item => {
      return item.id;
    },
    onEndReached: propsOnEndReached ?? onMore,
    viewabilityConfig: propsViewabilityConfig ?? viewabilityConfig,
    onViewableItemsChanged: propsOnViewableItemsChanged ?? onViewableItemsChanged,
    ListEmptyComponent: _Placeholder.EmptyPlaceholder,
    ListErrorComponent: listState === 'error' ? /*#__PURE__*/React.createElement(_Placeholder.ErrorPlaceholder, {
      onClicked: () => {
        onRefresh === null || onRefresh === void 0 ? void 0 : onRefresh();
      }
    }) : null,
    ListLoadingComponent: listState === 'loading' ? /*#__PURE__*/React.createElement(_Placeholder.LoadingPlaceholder, null) : null
  }, others))), /*#__PURE__*/React.createElement(_BottomSheetMenu.BottomSheetNameMenu, {
    ref: menuRef,
    onRequestModalClose: onRequestCloseMenu
  }), /*#__PURE__*/React.createElement(_Alert.Alert, {
    ref: alertRef
  }));
}
//# sourceMappingURL=ConversationList.js.map