function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { View } from 'react-native';
import { useColors } from '../../hook';
import { usePaletteContext } from '../../theme';
import { Alert } from '../../ui/Alert';
import { FlatListFactory } from '../../ui/FlatList';
import { BottomSheetNameMenu } from '../BottomSheetMenu';
import { BottomSheetMessageReport } from '../MessageReport';
import { EmptyPlaceholder, ErrorPlaceholder, LoadingPlaceholder } from '../Placeholder';
import { useMessageList } from './MessageList.hooks';
/**
 * Message List Component.
 *
 * This component can display sent and received messages, display historical messages, play language messages, preview pictures, video messages, download files, and customize behaviors and styles such as previewing pictures, previewing videos, and downloading documents. Custom messages can be added and more. Usually used in conjunction with the `MessageInput` component.
 */
export const MessageList = /*#__PURE__*/React.forwardRef(function (props, ref) {
  const FlatList = React.useMemo(() => FlatListFactory(), []);
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
  } = useMessageList(props, ref);
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
  }, /*#__PURE__*/React.createElement(View, {
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
    ListEmptyComponent: EmptyPlaceholder,
    ListErrorComponent: listState === 'error' ? /*#__PURE__*/React.createElement(ErrorPlaceholder, {
      onClicked: () => {
        onRefresh === null || onRefresh === void 0 ? void 0 : onRefresh();
      }
    }) : null,
    ListLoadingComponent: listState === 'loading' ? /*#__PURE__*/React.createElement(LoadingPlaceholder, null) : null
  })), /*#__PURE__*/React.createElement(BottomSheetNameMenu, {
    ref: menuRef,
    onRequestModalClose: onRequestCloseMenu
  }), /*#__PURE__*/React.createElement(Alert, {
    ref: alertRef
  }), /*#__PURE__*/React.createElement(BottomSheetMessageReport, {
    ref: reportRef,
    data: reportData,
    onReport: reportMessage
  }));
});
export const MessageListMemo = /*#__PURE__*/React.memo(MessageList);
//# sourceMappingURL=MessageList.js.map