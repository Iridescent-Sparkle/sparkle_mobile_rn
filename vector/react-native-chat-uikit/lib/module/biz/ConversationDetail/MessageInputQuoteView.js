import * as React from 'react';
import { Dimensions, View } from 'react-native';
import { ChatMessageType } from 'react-native-chat-sdk';
import { gCustomMessageCardEventType } from '../../chat';
import { userInfoFromMessage } from '../../chat/utils';
import { useColors } from '../../hook';
import { useI18nContext } from '../../i18n';
import { usePaletteContext } from '../../theme';
import { IconButtonMemo } from '../../ui/Button';
import { Icon } from '../../ui/Image';
import { SingleLineText } from '../../ui/Text';
import { MessageDefaultImage } from './MessageListItem';
import { getImageThumbUrl, getVideoThumbUrl } from './MessageListItem.hooks';

/**
 * Message Input Quote View Component properties.
 */

/**
 * Message Input Quote View Component.
 */
export const MessageInputQuoteView = props => {
  const {
    showQuote,
    onDel,
    msg: propsMsg
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
    quote: {
      light: colors.neutral[9],
      dark: colors.neutral[3]
    },
    quote_del: {
      light: colors.neutral[3],
      dark: colors.neutral[7]
    },
    t1: {
      light: colors.neutralSpecial[5],
      dark: colors.neutralSpecial[6]
    },
    t2: {
      light: colors.neutral[5],
      dark: colors.neutral[6]
    }
  });
  const bodyType = React.useRef(propsMsg === null || propsMsg === void 0 ? void 0 : propsMsg.body.type).current;
  const [thumbUrl, setThumbUrl] = React.useState();
  const getContent = msg => {
    let maxWidth = Dimensions.get('window').width;
    if (msg.body.type === ChatMessageType.TXT) {
      maxWidth = maxWidth * 0.9;
      const body = msg.body;
      const content = body.content;
      return /*#__PURE__*/React.createElement(SingleLineText, {
        textType: 'small',
        paletteType: 'body',
        style: {
          color: getColor('t2'),
          maxWidth: maxWidth
        }
      }, content);
    } else if (msg.body.type === ChatMessageType.FILE) {
      maxWidth = maxWidth * 0.8;
      const body = msg.body;
      return /*#__PURE__*/React.createElement(View, {
        style: {
          flexDirection: 'row',
          maxWidth: maxWidth
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: 'doc',
        style: {
          width: 16,
          height: 16,
          tintColor: getColor('t2'),
          marginRight: 2
        }
      }), /*#__PURE__*/React.createElement(SingleLineText, {
        textType: 'small',
        paletteType: 'label',
        style: {
          color: getColor('t2')
        }
      }, tr('_uikit_chat_input_quote_file'), /*#__PURE__*/React.createElement(SingleLineText, {
        textType: 'small',
        paletteType: 'body',
        style: {
          color: getColor('t2')
        }
      }, body.displayName.substring(0))));
    } else if (msg.body.type === ChatMessageType.IMAGE) {
      maxWidth = maxWidth * 0.6;
      return /*#__PURE__*/React.createElement(View, {
        style: {
          flexDirection: 'row',
          maxWidth: maxWidth
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: 'img',
        style: {
          width: 16,
          height: 16,
          tintColor: getColor('t2'),
          marginRight: 2
        }
      }), /*#__PURE__*/React.createElement(SingleLineText, {
        textType: 'small',
        paletteType: 'label',
        style: {
          color: getColor('t2')
        }
      }, tr('picture')));
    } else if (msg.body.type === ChatMessageType.VIDEO) {
      maxWidth = maxWidth * 0.6;
      return /*#__PURE__*/React.createElement(View, {
        style: {
          flexDirection: 'row',
          maxWidth: maxWidth
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: 'triangle_in_rectangle',
        style: {
          width: 16,
          height: 16,
          tintColor: getColor('t2'),
          marginRight: 2
        }
      }), /*#__PURE__*/React.createElement(SingleLineText, {
        textType: 'small',
        paletteType: 'label',
        style: {
          color: getColor('t2')
        }
      }, tr('video')));
    } else if (msg.body.type === ChatMessageType.VOICE) {
      maxWidth = maxWidth * 0.6;
      const body = msg.body;
      const second = Math.floor(body.duration ?? 0);
      return /*#__PURE__*/React.createElement(View, {
        style: {
          flexDirection: 'row',
          maxWidth: maxWidth
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: '3th_frame_lft_lgt_sdy',
        style: {
          width: 16,
          height: 16,
          tintColor: getColor('t2'),
          marginRight: 2
        }
      }), /*#__PURE__*/React.createElement(SingleLineText, {
        textType: 'small',
        paletteType: 'label',
        style: {
          color: getColor('t2')
        }
      }, tr('voice')), /*#__PURE__*/React.createElement(SingleLineText, {
        textType: 'small',
        paletteType: 'body',
        style: {
          color: getColor('t2')
        }
      }, tr(` ${second}"`)));
    } else if (msg.body.type === ChatMessageType.CUSTOM) {
      const body = msg.body;
      const event = body.event;
      if (event === gCustomMessageCardEventType) {
        const cardParams = body.params;
        maxWidth = maxWidth * 0.8;
        return /*#__PURE__*/React.createElement(View, {
          style: {
            flexDirection: 'row',
            maxWidth: maxWidth
          }
        }, /*#__PURE__*/React.createElement(Icon, {
          name: 'person_single_fill',
          style: {
            width: 16,
            height: 16,
            tintColor: getColor('t2'),
            marginRight: 2
          }
        }), /*#__PURE__*/React.createElement(SingleLineText, {
          textType: 'small',
          paletteType: 'label',
          style: {
            color: getColor('t2')
          }
        }, tr('card'), /*#__PURE__*/React.createElement(SingleLineText, {
          textType: 'small',
          paletteType: 'body',
          style: {
            color: getColor('t2')
          }
        }, cardParams.nickname ?? cardParams.userId)));
      }
    }
    return null;
  };
  const getContentThumb = React.useCallback(async msg => {
    if (msg.body.type === ChatMessageType.IMAGE) {
      const ret = await getImageThumbUrl(msg);
      setThumbUrl(ret);
    } else if (msg.body.type === ChatMessageType.VIDEO) {
      const ret = await getVideoThumbUrl(msg);
      setThumbUrl(ret);
    }
  }, []);
  const getUserName = msg => {
    const user = userInfoFromMessage(msg);
    return (user === null || user === void 0 ? void 0 : user.userName) ?? (user === null || user === void 0 ? void 0 : user.userId) ?? msg.from;
  };
  React.useEffect(() => {
    if (propsMsg) {
      getContentThumb(propsMsg);
    }
  }, [getContentThumb, propsMsg]);
  if (showQuote !== true || propsMsg === undefined) {
    return null;
  }
  return /*#__PURE__*/React.createElement(View, {
    style: {
      height: 52,
      backgroundColor: getColor('quote'),
      flexDirection: 'row',
      paddingHorizontal: 12,
      paddingVertical: 8,
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement(SingleLineText, {
    textType: 'small',
    paletteType: 'label',
    style: {
      color: getColor('t1'),
      fontWeight: '500',
      maxWidth: '60%'
    }
  }, tr('you'), /*#__PURE__*/React.createElement(SingleLineText, {
    textType: 'small',
    paletteType: 'body',
    style: {
      color: getColor('t1'),
      maxWidth: '70%'
    }
  }, tr('_uikit_chat_input_quote_title_1'), /*#__PURE__*/React.createElement(SingleLineText, {
    textType: 'small',
    paletteType: 'label',
    style: {
      color: getColor('t1'),
      fontWeight: '500',
      maxWidth: '60%'
    }
  }, getUserName(propsMsg)))), /*#__PURE__*/React.createElement(View, {
    style: {
      height: 4
    }
  }), getContent(propsMsg)), thumbUrl ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MessageDefaultImage, {
    url: thumbUrl,
    width: 36,
    height: 36,
    thumbWidth: 24,
    thumbHeight: 24,
    iconName: bodyType === ChatMessageType.IMAGE ? 'img' : 'triangle_in_rectangle'
  }), /*#__PURE__*/React.createElement(View, {
    style: {
      width: 12
    }
  })) : null, /*#__PURE__*/React.createElement(IconButtonMemo, {
    iconName: 'xmark_in_circle_fill',
    style: {
      width: 20,
      height: 20,
      tintColor: getColor('quote_del')
    },
    onPress: onDel
  }));
};
//# sourceMappingURL=MessageInputQuoteView.js.map