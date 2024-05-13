function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { View } from 'react-native';
import { useColors } from '../../hook';
import { usePaletteContext } from '../../theme';
import { Alert } from '../../ui/Alert';
import { FlatListFactory } from '../../ui/FlatList';
import { Avatar } from '../Avatar';
import { BottomSheetNameMenu } from '../BottomSheetMenu';
import { EmptyPlaceholder, ErrorPlaceholder, LoadingPlaceholder } from '../Placeholder';
import { SearchStyle } from '../SearchStyle';
import { TopNavigationBar, TopNavigationBarRight, TopNavigationBarTitle } from '../TopNavigationBar';
import { useConversationList } from './ConversationList.hooks';
const FlatList = FlatListFactory();

/**
 * The conversation list component mainly consists of four parts, including navigation component, search style component, individual list item component, and list component. Supports displaying bottom menu components and warning components. The navigation bar component can be set to display or not, customize the style, or even replace it as a whole. The search style component supports whether to display and customize styles, and the individual list item component supports whether to display, add or replace any multiple components. List components support more property settings.
 */
export function ConversationList(props) {
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
  } = useConversationList(props);
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
  } = usePaletteContext();
  const {
    getColor
  } = useColors({
    bg: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    }
  });
  return /*#__PURE__*/React.createElement(View, {
    style: [{
      backgroundColor: getColor('bg')
    }, containerStyle]
  }, navigationBarVisible !== false ? customNavigationBar ? /*#__PURE__*/React.createElement(React.Fragment, null, customNavigationBar) : /*#__PURE__*/React.createElement(TopNavigationBar, {
    Left: /*#__PURE__*/React.createElement(Avatar, {
      url: avatarUrl,
      size: 32
    }),
    Right: TopNavigationBarRight,
    RightProps: {
      onClicked: onShowConversationListMoreActions,
      iconName: 'plus_in_circle'
    },
    Title: TopNavigationBarTitle({
      text: 'Chat'
    })
  }) : null, searchStyleVisible !== false ? customSearch ? /*#__PURE__*/React.createElement(React.Fragment, null, customSearch) : /*#__PURE__*/React.createElement(SearchStyle, {
    title: tr('search'),
    onPress: () => {
      if (listState === 'normal') {
        onClickedSearch === null || onClickedSearch === void 0 ? void 0 : onClickedSearch();
      }
    }
  }) : null, /*#__PURE__*/React.createElement(View, {
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
    ListEmptyComponent: EmptyPlaceholder,
    ListErrorComponent: listState === 'error' ? /*#__PURE__*/React.createElement(ErrorPlaceholder, {
      onClicked: () => {
        onRefresh === null || onRefresh === void 0 ? void 0 : onRefresh();
      }
    }) : null,
    ListLoadingComponent: listState === 'loading' ? /*#__PURE__*/React.createElement(LoadingPlaceholder, null) : null
  }, others))), /*#__PURE__*/React.createElement(BottomSheetNameMenu, {
    ref: menuRef,
    onRequestModalClose: onRequestCloseMenu
  }), /*#__PURE__*/React.createElement(Alert, {
    ref: alertRef
  }));
}
//# sourceMappingURL=ConversationList.js.map