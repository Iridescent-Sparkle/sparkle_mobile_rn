import * as React from 'react';
import { Pressable, View } from 'react-native';
import { ChatDownloadStatus, ChatMessageType } from 'react-native-chat-sdk';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { gMessageAttributeFileProgress, useChatContext } from '../../chat';
import { ErrorCode, UIKitError } from '../../error';
import { useColors } from '../../hook';
import { Services } from '../../services';
import { usePaletteContext } from '../../theme';
import { Icon } from '../../ui/Image';
import { Text } from '../../ui/Text';

/**
 * File Message Preview Component properties.
 */

/**
 * File Message Preview Component.
 */
export function FileMessagePreview(props) {
  const {
    containerStyle,
    children,
    msgId: propsMsgId,
    localMsgId: propsLocalMsgId,
    onBack
  } = props;
  const im = useChatContext();
  const {
    top
  } = useSafeAreaInsets();
  const {
    colors
  } = usePaletteContext();
  const {
    getColor
  } = useColors({
    icon: {
      light: colors.neutral[3],
      dark: colors.neutral[95]
    }
  });
  const [progress, setProgress] = React.useState(0);
  const onGetMessage = React.useCallback(msgId => {
    im.getMessage({
      messageId: msgId
    }).then(async result => {
      if (result) {
        if (result.body.type !== ChatMessageType.FILE) {
          throw new UIKitError({
            code: ErrorCode.chat_uikit,
            desc: 'Message type is not ChatMessageType.FILE'
          });
        }
        const body = result.body;
        const isExisted = await Services.dcs.isExistedFile(body.localPath);
        if (isExisted !== true) {
          setProgress(0);
          im.messageManager.downloadAttachment(result);
        } else {
          setProgress(100);
        }
      }
    }).catch();
  }, [im]);
  React.useEffect(() => {
    onGetMessage(propsMsgId);
  }, [onGetMessage, propsMsgId]);
  React.useEffect(() => {
    const listener = {
      onSendMessageChanged: msg => {
        // upload progress
        if (msg.localMsgId === propsLocalMsgId && msg.body.type === ChatMessageType.FILE) {
          const body = msg.body;
          if (body.fileStatus === ChatDownloadStatus.SUCCESS) {
            setProgress(100);
          }
        }
      },
      onSendMessageProgressChanged: msg => {
        // upload progress
        if (msg.localMsgId === propsLocalMsgId && msg.body.type === ChatMessageType.FILE) {
          var _msg$attributes;
          const progress = (_msg$attributes = msg.attributes) === null || _msg$attributes === void 0 ? void 0 : _msg$attributes[gMessageAttributeFileProgress];
          if (progress) {
            setProgress(progress);
          }
        }
      },
      onMessageAttachmentChanged: msg => {
        // download progress
        if (msg.msgId === propsMsgId && msg.body.type === ChatMessageType.FILE) {
          const body = msg.body;
          if (body.fileStatus === ChatDownloadStatus.SUCCESS) {
            setProgress(100);
          }
        }
      },
      onMessageAttachmentProgressChanged: msg => {
        // download progress
        if (msg.msgId === propsMsgId && msg.body.type === ChatMessageType.FILE) {
          var _msg$attributes2;
          const progress = (_msg$attributes2 = msg.attributes) === null || _msg$attributes2 === void 0 ? void 0 : _msg$attributes2[gMessageAttributeFileProgress];
          if (progress) {
            setProgress(progress);
          }
        }
      }
    };
    im.messageManager.addListener('FileMessagePreview', listener);
    return () => {
      im.messageManager.removeListener('FileMessagePreview');
    };
  }, [im.messageManager, propsLocalMsgId, propsMsgId]);
  if (children) {
    return /*#__PURE__*/React.createElement(View, {
      style: [{
        flexGrow: 1
      }, containerStyle]
    }, children);
  } else {
    return /*#__PURE__*/React.createElement(View, {
      style: [{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }, containerStyle]
    }, /*#__PURE__*/React.createElement(Text, null, progress), /*#__PURE__*/React.createElement(Pressable, {
      style: {
        position: 'absolute',
        width: 44,
        height: 44,
        top: top,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center'
        // backgroundColor: 'red',
      },

      onPress: onBack
      // pointerEvents={'none'}
    }, /*#__PURE__*/React.createElement(Icon, {
      name: 'chevron_left',
      style: {
        height: 24,
        width: 24,
        tintColor: getColor('icon')
      }
    })));
  }
}
//# sourceMappingURL=FileMessagePreview.js.map