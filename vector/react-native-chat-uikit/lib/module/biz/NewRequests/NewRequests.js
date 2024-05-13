function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useColors } from '../../hook';
import { usePaletteContext } from '../../theme';
import { Alert } from '../../ui/Alert';
import { IconButton } from '../../ui/Button';
import { FlatListFactory } from '../../ui/FlatList';
import { Text } from '../../ui/Text';
import { BottomSheetNameMenu } from '../BottomSheetMenu';
import { EmptyPlaceholder, ErrorPlaceholder } from '../Placeholder';
import { SearchStyle } from '../SearchStyle';
import { TopNavigationBar, TopNavigationBarRight, TopNavigationBarTitle } from '../TopNavigationBar';
import { useNewRequests } from './NewRequests.hooks';
const FlatList = FlatListFactory();

/**
 * New Requests Component.
 *
 * This component displays and manages contact requests.
 */
export function NewRequests(props) {
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
  } = useNewRequests(props);
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
    text: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    },
    icon: {
      light: colors.neutral[3],
      dark: colors.neutral[95]
    }
  });
  return /*#__PURE__*/React.createElement(View, {
    style: [{
      backgroundColor: getColor('bg')
    }, containerStyle]
  }, navigationBarVisible !== false ? customNavigationBar ? /*#__PURE__*/React.createElement(React.Fragment, null, customNavigationBar) : /*#__PURE__*/React.createElement(TopNavigationBar, {
    Left: /*#__PURE__*/React.createElement(Pressable, {
      style: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40
      },
      onPress: onBack
    }, /*#__PURE__*/React.createElement(IconButton, {
      iconName: 'chevron_left',
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
    }, tr('_uikit_new_quest_title'))),
    Right: TopNavigationBarRight,
    RightProps: {
      onClicked: () => {
        onAddContact();
      },
      iconName: 'person_add'
    },
    Title: TopNavigationBarTitle({
      text: ''
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
    ListEmptyComponent: EmptyPlaceholder,
    ListErrorComponent: listState === 'error' ? /*#__PURE__*/React.createElement(ErrorPlaceholder, {
      onClicked: () => {
        onRefresh === null || onRefresh === void 0 ? void 0 : onRefresh();
      }
    }) : null
  })), /*#__PURE__*/React.createElement(BottomSheetNameMenu, {
    ref: menuRef,
    onRequestModalClose: onRequestCloseMenu
  }), /*#__PURE__*/React.createElement(Alert, {
    ref: alertRef
  }));
}
//# sourceMappingURL=NewRequests.js.map