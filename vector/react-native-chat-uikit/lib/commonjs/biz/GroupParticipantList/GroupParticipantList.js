"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupParticipantList = GroupParticipantList;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _theme = require("../../theme");
var _Alert = require("../../ui/Alert");
var _FlatList = require("../../ui/FlatList");
var _BottomSheetMenu = require("../BottomSheetMenu");
var _Placeholder = require("../Placeholder");
var _GroupParticipantList = require("./GroupParticipantList.hooks");
var _GroupParticipantList2 = require("./GroupParticipantList.navi");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const FlatList = (0, _FlatList.FlatListFactory)();

/**
 * Group Participant List Component.
 */
function GroupParticipantList(props) {
  const {
    containerStyle,
    onBack,
    participantType,
    navigationBarVisible
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
    participantCount,
    onClickedAddParticipant,
    onClickedDelParticipant,
    deleteCount,
    onDelParticipant,
    alertRef,
    onCheckClicked,
    menuRef,
    onRequestCloseMenu,
    ListItemRender,
    groupId,
    ownerId
  } = (0, _GroupParticipantList.useGroupParticipantList)(props);
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
    text_disable: {
      light: colors.neutral[7],
      dark: colors.neutral[3]
    },
    text_enable: {
      light: colors.error[5],
      dark: colors.error[6]
    }
  });
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [{
      flexGrow: 1,
      backgroundColor: getColor('bg')
    }, containerStyle]
  }, navigationBarVisible !== false ? /*#__PURE__*/React.createElement(_GroupParticipantList2.GroupParticipantListNavigationBar, {
    groupId: groupId,
    ownerId: ownerId,
    participantType: participantType,
    onBack: onBack,
    onDelParticipant: onDelParticipant,
    deleteCount: deleteCount,
    participantCount: participantCount,
    onClickedAddParticipant: onClickedAddParticipant,
    onClickedDelParticipant: onClickedDelParticipant
  }) : null, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(FlatList, {
    ref: ref,
    contentContainerStyle: {
      flexGrow: 1
      // height: '100%',
      // height: 400,
      // backgroundColor: 'yellow',
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
        onCheckClicked: onCheckClicked,
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
//# sourceMappingURL=GroupParticipantList.js.map