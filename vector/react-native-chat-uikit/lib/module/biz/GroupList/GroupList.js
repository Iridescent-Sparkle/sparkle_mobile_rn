function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useColors } from '../../hook';
import { usePaletteContext } from '../../theme';
import { Alert } from '../../ui/Alert';
import { FlatListFactory } from '../../ui/FlatList';
import { Icon } from '../../ui/Image';
import { Text } from '../../ui/Text';
import { BottomSheetNameMenu } from '../BottomSheetMenu';
import { EmptyPlaceholder, ErrorPlaceholder, LoadingPlaceholder } from '../Placeholder';
import { SearchStyle } from '../SearchStyle';
import { TopNavigationBar } from '../TopNavigationBar';
import { useGroupList } from './GroupList.hooks';
const FlatList = FlatListFactory();

/**
 * Group List Component.
 */
export function GroupList(props) {
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
    onLongPress,
    tr,
    ListItemRender,
    menuRef,
    alertRef,
    closeMenu,
    flatListProps,
    groupCount
  } = useGroupList(props);
  const {
    style,
    contentContainerStyle,
    refreshing: propsRefreshing,
    onRefresh: propsOnRefresh,
    onEndReached: propsOnEndReached,
    viewabilityConfig: propsViewabilityConfig,
    onViewableItemsChanged: propsOnViewableItemsChanged,
    ...others
  } = flatListProps ?? {};
  const {
    colors
  } = usePaletteContext();
  const {
    getColor
  } = useColors({
    bg: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    },
    icon: {
      light: colors.neutral[3],
      dark: colors.neutral[95]
    },
    text: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    }
  });
  return /*#__PURE__*/React.createElement(View, {
    style: [{
      flexGrow: 1,
      backgroundColor: getColor('bg')
    }, containerStyle]
  }, navigationBarVisible !== false ? customNavigationBar ? /*#__PURE__*/React.createElement(React.Fragment, null, customNavigationBar) : /*#__PURE__*/React.createElement(TopNavigationBar, {
    Left: /*#__PURE__*/React.createElement(Pressable, {
      style: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      onPress: onBack
    }, /*#__PURE__*/React.createElement(Icon, {
      name: 'chevron_left',
      style: {
        width: 24,
        height: 24,
        tintColor: getColor('icon')
      }
    }), /*#__PURE__*/React.createElement(Text, {
      paletteType: 'title',
      textType: 'medium',
      style: {
        color: getColor('text')
      }
    }, tr('_uikit_group_title', groupCount))),
    Right: /*#__PURE__*/React.createElement(View, {
      style: {
        width: 32,
        height: 32
      }
    })
  }) : null, searchStyleVisible !== false ? customSearch ? /*#__PURE__*/React.createElement(React.Fragment, null, customSearch) : /*#__PURE__*/React.createElement(SearchStyle, {
    title: tr('search'),
    onPress: () => {
      onClickedSearch === null || onClickedSearch === void 0 ? void 0 : onClickedSearch();
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
      // height: '100%',
      // height: 400,
      // backgroundColor: 'yellow',
    }, contentContainerStyle],
    data: data,
    refreshing: propsRefreshing ?? refreshing,
    onRefresh: propsOnRefresh ?? onRefresh,
    renderItem: info => {
      const {
        item
      } = info;
      return /*#__PURE__*/React.createElement(ListItemRender, _extends({}, item, {
        onClicked: onClicked,
        onLongPressed: onLongPress
      }));
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
    onRequestModalClose: closeMenu
  }), /*#__PURE__*/React.createElement(Alert, {
    ref: alertRef
  }));
}
//# sourceMappingURL=GroupList.js.map