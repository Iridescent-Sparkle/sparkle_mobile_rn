import * as React from 'react';
import { View } from 'react-native';
import { ErrorCode, UIKitError } from '../../error';
import { useI18nContext } from '../../i18n';
import { BlockButton } from '../../ui/Button';

/**
 * Block Buttons Component properties.
 *
 * There are three built-in buttons, including send message button, send audio button, and send video button.
 */

export const BlockButtons = props => {
  const {
    hasAudioCall = false,
    hasSendMessage = true,
    hasVideoCall = false,
    onSendMessage,
    onAudioCall,
    onVideoCall,
    onInitButton
  } = props;
  const {
    tr
  } = useI18nContext();
  const items = [];
  if (hasSendMessage) {
    items.push( /*#__PURE__*/React.createElement(BlockButton, {
      key: '100',
      iconName: 'bubble_fill',
      text: tr('_uikit_info_send_msg'),
      containerStyle: {
        height: 62,
        width: 114
      },
      onPress: onSendMessage
    }));
  }
  if (hasAudioCall) {
    items.push( /*#__PURE__*/React.createElement(BlockButton, {
      key: '101',
      iconName: 'phone_pick',
      text: tr('_uikit_info_send_audio'),
      containerStyle: {
        height: 62,
        width: 114
      },
      onPress: onAudioCall
    }));
  }
  if (hasVideoCall) {
    items.push( /*#__PURE__*/React.createElement(BlockButton, {
      key: '102',
      iconName: 'video_camera',
      text: tr('_uikit_info_send_video'),
      containerStyle: {
        height: 62,
        width: 114
      },
      onPress: onVideoCall
    }));
  }
  const _items = onInitButton ? onInitButton(items) : items;
  if (_items.length > 5) {
    throw new UIKitError({
      code: ErrorCode.max_count,
      desc: 'BlockButtons: items.length > 5'
    });
  }
  return /*#__PURE__*/React.createElement(View, {
    style: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    }
  }, _items);
};
//# sourceMappingURL=BlockButtons.js.map