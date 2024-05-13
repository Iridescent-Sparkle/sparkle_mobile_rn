function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { View } from 'react-native';
import { useColors } from '../../hook';
import { usePaletteContext } from '../../theme';
import { Alert } from '../../ui/Alert';
import { FlatListFactory } from '../../ui/FlatList';
import { BottomSheetNameMenu } from '../BottomSheetMenu';
import { EmptyPlaceholder, ErrorPlaceholder } from '../Placeholder';
import { useGroupParticipantList } from './GroupParticipantList.hooks';
import { GroupParticipantListNavigationBar } from './GroupParticipantList.navi';
const FlatList = FlatListFactory();

/**
 * Group Participant List Component.
 */
export function GroupParticipantList(props) {
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
  } = useGroupParticipantList(props);
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
    text_disable: {
      light: colors.neutral[7],
      dark: colors.neutral[3]
    },
    text_enable: {
      light: colors.error[5],
      dark: colors.error[6]
    }
  });
  return /*#__PURE__*/React.createElement(View, {
    style: [{
      flexGrow: 1,
      backgroundColor: getColor('bg')
    }, containerStyle]
  }, navigationBarVisible !== false ? /*#__PURE__*/React.createElement(GroupParticipantListNavigationBar, {
    groupId: groupId,
    ownerId: ownerId,
    participantType: participantType,
    onBack: onBack,
    onDelParticipant: onDelParticipant,
    deleteCount: deleteCount,
    participantCount: participantCount,
    onClickedAddParticipant: onClickedAddParticipant,
    onClickedDelParticipant: onClickedDelParticipant
  }) : null, /*#__PURE__*/React.createElement(View, {
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
//# sourceMappingURL=GroupParticipantList.js.map