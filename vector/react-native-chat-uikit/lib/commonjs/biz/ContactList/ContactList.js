"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactList = ContactList;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _theme = require("../../theme");
var _Alert = require("../../ui/Alert");
var _SectionList = require("../../ui/SectionList");
var _BottomSheetMenu = require("../BottomSheetMenu");
var _Placeholder = require("../Placeholder");
var _SearchStyle = require("../SearchStyle");
var _ContactList = require("./ContactList.hooks");
var _ContactList2 = require("./ContactList.navi");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const SectionList = (0, _SectionList.SectionListFactory)();

/**
 * The contact list component mainly consists of four parts, including navigation component, search style component, individual list item component, and list component. Supports displaying bottom menu components and warning components. The navigation bar component can be set to display or not, customize the style, or even replace it as a whole. The search style component supports whether to display, and the individual list item component supports whether to display, add or replace any multiple components. List components support more property settings.
 */
function ContactList(props) {
  const {
    containerStyle,
    contactType,
    onBack,
    navigationBarVisible,
    customNavigationBar,
    searchStyleVisible,
    customSearch,
    onClickedSearch
  } = props;
  const {
    ref,
    sections,
    indexTitles,
    onRefresh,
    refreshing,
    onMore,
    viewabilityConfig,
    onViewableItemsChanged,
    listState,
    AlphabeticIndex,
    onIndexSelected,
    onRequestCloseMenu,
    menuRef,
    onClickedNewContact,
    alertRef,
    onClicked,
    onLongPressed,
    onCheckClicked,
    selectedCount,
    onClickedCreateGroup,
    selectedMemberCount,
    onClickedAddGroupParticipant,
    avatarUrl,
    tr,
    ListItemRender,
    ListItemHeaderRender,
    sectionListProps,
    ListHeaderComponent
  } = (0, _ContactList.useContactList)(props);
  const {
    style,
    contentContainerStyle,
    refreshing: propsRefreshing,
    onRefresh: propsOnRefresh,
    onEndReached: propsOnEndReached,
    viewabilityConfig: propsViewabilityConfig,
    onViewableItemsChanged: propsOnViewableItemsChanged,
    showsVerticalScrollIndicator,
    ...others
  } = sectionListProps ?? {};
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
      light: colors.primary[5],
      dark: colors.primary[6]
    }
  });
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [{
      backgroundColor: getColor('bg'),
      flexGrow: 1
    }, containerStyle]
  }, navigationBarVisible !== false ? /*#__PURE__*/React.createElement(_ContactList2.ContactListNavigationBar, {
    contactType: contactType,
    selectedCount: selectedCount,
    selectedMemberCount: selectedMemberCount,
    avatarUrl: avatarUrl,
    onClickedNewContact: onClickedNewContact,
    onBack: onBack,
    onClickedCreateGroup: onClickedCreateGroup,
    onClickedAddGroupParticipant: onClickedAddGroupParticipant,
    customNavigationBar: customNavigationBar
  }) : null, searchStyleVisible !== false ? customSearch ? /*#__PURE__*/React.createElement(React.Fragment, null, customSearch) : /*#__PURE__*/React.createElement(_SearchStyle.SearchStyle, {
    title: tr('search'),
    onPress: () => {
      onClickedSearch === null || onClickedSearch === void 0 ? void 0 : onClickedSearch();
    }
  }) : null, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(SectionList, _extends({
    ListHeaderComponent: ListHeaderComponent,
    ref: ref,
    style: [{
      flexGrow: 1
    }, style],
    contentContainerStyle: [{
      flexGrow: 1
    }, contentContainerStyle],
    sections: sections,
    showsVerticalScrollIndicator: showsVerticalScrollIndicator ?? false,
    refreshing: propsRefreshing ?? refreshing,
    onRefresh: propsOnRefresh ?? onRefresh,
    renderItem: info => {
      const {
        item
      } = info;
      return /*#__PURE__*/React.createElement(ListItemRender, _extends({}, item, {
        onClicked: onClicked,
        onLongPressed: onLongPressed,
        onCheckClicked: onCheckClicked
      }));
    },
    keyExtractor: item => {
      return item.id;
    },
    renderSectionHeader: info => {
      const {
        section
      } = info;
      return /*#__PURE__*/React.createElement(ListItemHeaderRender, section);
    },
    onEndReached: propsOnEndReached ?? onMore,
    viewabilityConfig: propsViewabilityConfig ?? viewabilityConfig,
    onViewableItemsChanged: propsOnViewableItemsChanged ?? onViewableItemsChanged,
    ListEmptyComponent: _Placeholder.EmptyPlaceholder,
    ListErrorComponent: listState === 'error' ? /*#__PURE__*/React.createElement(_Placeholder.ErrorPlaceholder, {
      onClicked: () => {
        onRefresh === null || onRefresh === void 0 ? void 0 : onRefresh();
      }
    }) : null
  }, others)), AlphabeticIndex ? /*#__PURE__*/React.createElement(_reactNative.View, {
    pointerEvents: 'box-none',
    style: [_reactNative.StyleSheet.absoluteFill, {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      right: 2,
      left: 0
    }]
  }, /*#__PURE__*/React.createElement(AlphabeticIndex, {
    indexTitles: indexTitles,
    onIndexSelected: onIndexSelected
  })) : null), /*#__PURE__*/React.createElement(_BottomSheetMenu.BottomSheetNameMenu, {
    ref: menuRef,
    onRequestModalClose: onRequestCloseMenu
  }), /*#__PURE__*/React.createElement(_Alert.Alert, {
    ref: alertRef
  }));
}
//# sourceMappingURL=ContactList.js.map