"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewRequests = NewRequests;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _theme = require("../../theme");
var _Alert = require("../../ui/Alert");
var _Button = require("../../ui/Button");
var _FlatList = require("../../ui/FlatList");
var _Text = require("../../ui/Text");
var _BottomSheetMenu = require("../BottomSheetMenu");
var _Placeholder = require("../Placeholder");
var _SearchStyle = require("../SearchStyle");
var _TopNavigationBar = require("../TopNavigationBar");
var _NewRequests = require("./NewRequests.hooks");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const FlatList = (0, _FlatList.FlatListFactory)();

/**
 * New Requests Component.
 *
 * This component displays and manages contact requests.
 */
function NewRequests(props) {
  const {
    containerStyle,
    onBack,
    navigationBarVisible,
    customNavigationBar,
    searchStyleVisible = false,
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
    onClicked,
    onLongPressed,
    onButtonClicked,
    tr,
    ListItemRender,
    onAddContact,
    menuRef,
    alertRef,
    onRequestCloseMenu
  } = (0, _NewRequests.useNewRequests)(props);
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    bg: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    },
    text: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    },
    icon: {
      light: colors.neutral[3],
      dark: colors.neutral[95]
    }
  });
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [{
      backgroundColor: getColor('bg')
    }, containerStyle]
  }, navigationBarVisible !== false ? customNavigationBar ? /*#__PURE__*/React.createElement(React.Fragment, null, customNavigationBar) : /*#__PURE__*/React.createElement(_TopNavigationBar.TopNavigationBar, {
    Left: /*#__PURE__*/React.createElement(_reactNative.Pressable, {
      style: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40
      },
      onPress: onBack
    }, /*#__PURE__*/React.createElement(_Button.IconButton, {
      iconName: 'chevron_left',
      style: {
        width: 24,
        height: 24,
        tintColor: getColor('icon')
      }
    }), /*#__PURE__*/React.createElement(_Text.Text, {
      paletteType: 'title',
      textType: 'medium',
      style: {
        color: getColor('text')
      }
    }, tr('_uikit_new_quest_title'))),
    Right: _TopNavigationBar.TopNavigationBarRight,
    RightProps: {
      onClicked: () => {
        onAddContact();
      },
      iconName: 'person_add'
    },
    Title: (0, _TopNavigationBar.TopNavigationBarTitle)({
      text: ''
    })
  }) : null, searchStyleVisible !== false ? customSearch ? /*#__PURE__*/React.createElement(React.Fragment, null, customSearch) : /*#__PURE__*/React.createElement(_SearchStyle.SearchStyle, {
    title: tr('search'),
    onPress: () => {
      onClickedSearch === null || onClickedSearch === void 0 ? void 0 : onClickedSearch();
    }
  }) : null, /*#__PURE__*/React.createElement(_reactNative.View, {
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
    refreshing: refreshing,
    onRefresh: onRefresh,
    renderItem: info => {
      const {
        item
      } = info;
      return /*#__PURE__*/React.createElement(ListItemRender, _extends({}, item, {
        onClicked: onClicked,
        onButtonClicked: onButtonClicked,
        onLongPressed: onLongPressed
      }));
    },
    keyExtractor: item => {
      return item.id;
    },
    onEndReached: onMore,
    viewabilityConfig: viewabilityConfig,
    onViewableItemsChanged: onViewableItemsChanged,
    ListEmptyComponent: _Placeholder.EmptyPlaceholder,
    ListErrorComponent: listState === 'error' ? /*#__PURE__*/React.createElement(_Placeholder.ErrorPlaceholder, {
      onClicked: () => {
        onRefresh === null || onRefresh === void 0 ? void 0 : onRefresh();
      }
    }) : null
  })), /*#__PURE__*/React.createElement(_BottomSheetMenu.BottomSheetNameMenu, {
    ref: menuRef,
    onRequestModalClose: onRequestCloseMenu
  }), /*#__PURE__*/React.createElement(_Alert.Alert, {
    ref: alertRef
  }));
}
//# sourceMappingURL=NewRequests.js.map