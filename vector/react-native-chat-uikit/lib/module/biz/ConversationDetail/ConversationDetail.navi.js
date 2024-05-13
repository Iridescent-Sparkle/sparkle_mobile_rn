import * as React from 'react';
import { Dimensions, Platform, Pressable, View } from 'react-native';
import { useColors } from '../../hook';
import { useI18nContext } from '../../i18n';
import { usePaletteContext } from '../../theme';
import { IconButton } from '../../ui/Button';
import { Icon } from '../../ui/Image';
import { SingleLineText, Text } from '../../ui/Text';
import { Avatar } from '../Avatar';
import { TopNavigationBar, TopNavigationBarRightList } from '../TopNavigationBar';
export const ConversationDetailNavigationBar = props => {
  const {
    onBack,
    onClickedAvatar,
    convAvatar,
    convName,
    convId,
    NavigationBar,
    doNotDisturb
  } = props;
  const {
    tr
  } = useI18nContext();
  const {
    colors
  } = usePaletteContext();
  const {
    getColor
  } = useColors({
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
    },
    icon: {
      light: colors.neutral[3],
      dark: colors.neutral[95]
    },
    t3: {
      light: colors.neutral[7],
      dark: colors.neutral[5]
    }
  });
  if (NavigationBar) {
    // return { NavigationBar };
    return /*#__PURE__*/React.createElement(React.Fragment, null, NavigationBar);
  }
  return /*#__PURE__*/React.createElement(TopNavigationBar, {
    Left: /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: Platform.select({
          ios: '70%',
          android: '80%'
        })
      }
    }, /*#__PURE__*/React.createElement(IconButton, {
      iconName: 'chevron_left',
      style: {
        width: 24,
        height: 24,
        tintColor: getColor('icon')
      },
      onPress: onBack
    }), /*#__PURE__*/React.createElement(Pressable, {
      onPress: onClickedAvatar
    }, /*#__PURE__*/React.createElement(Avatar, {
      url: convAvatar,
      size: 32
    })), /*#__PURE__*/React.createElement(View, {
      style: {
        marginLeft: 10,
        maxWidth: Dimensions.get('window').width - 200
      }
    }, /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'row',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(SingleLineText, {
      textType: 'medium',
      paletteType: 'title',
      style: {
        color: getColor('text')
      }
    }, convName ?? convId), doNotDisturb === true ? /*#__PURE__*/React.createElement(Icon, {
      name: 'bell_slash',
      style: {
        height: 20,
        width: 20,
        tintColor: getColor('t3')
      }
    }) : null), /*#__PURE__*/React.createElement(Text, {
      textType: 'extraSmall',
      paletteType: 'label',
      style: {
        color: getColor('text_enable')
      }
    }, tr('state')))),
    Right: TopNavigationBarRightList,
    RightProps: {
      onClickedList: [() => {
        // todo: click phone_pick
      }, () => {
        // todo: click video_camera
      }],
      iconNameList: [
        // 'phone_pick',
        // 'video_camera'
      ]
    }
  });
};
//# sourceMappingURL=ConversationDetail.navi.js.map