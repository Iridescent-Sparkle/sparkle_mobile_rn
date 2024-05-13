"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFileSize = getFileSize;
exports.getImageShowSize = getImageShowSize;
exports.getImageSizeFromUrl = getImageSizeFromUrl;
exports.getImageThumbUrl = getImageThumbUrl;
exports.getMessageBubblePadding = getMessageBubblePadding;
exports.getMessageState = getMessageState;
exports.getQuoteAttribute = getQuoteAttribute;
exports.getStateIcon = getStateIcon;
exports.getStateIconColor = getStateIconColor;
exports.getSystemTip = getSystemTip;
exports.getVideoThumbUrl = getVideoThumbUrl;
exports.isQuoteMessage = isQuoteMessage;
exports.isSupportMessage = isSupportMessage;
var _reactNative = require("react-native");
var _reactNativeChatSdk = require("react-native-chat-sdk");
var _chat = require("../../chat");
var _services = require("../../services");
var _utils = require("../../utils");
function isSupportMessage(msg) {
  if (msg.body.type === _reactNativeChatSdk.ChatMessageType.CMD) {
    return false;
  } else if (msg.body.type === _reactNativeChatSdk.ChatMessageType.LOCATION) {
    return false;
  } else if (msg.body.type === _reactNativeChatSdk.ChatMessageType.COMBINE) {
    return false;
  } else if (msg.body.type === _reactNativeChatSdk.ChatMessageType.CUSTOM) {
    const body = msg.body;
    if (body.event === _chat.gCustomMessageCardEventType) {
      return true;
    }
    return false;
  }
  return true;
}
function getMessageState(msg) {
  let ret = 'none';
  if (msg.direction === _reactNativeChatSdk.ChatMessageDirection.RECEIVE) {
    switch (msg.body.type) {
      case _reactNativeChatSdk.ChatMessageType.VOICE:
        {
          var _msg$attributes;
          const r = (_msg$attributes = msg.attributes) === null || _msg$attributes === void 0 ? void 0 : _msg$attributes[_chat.gMessageAttributeVoiceReadFlag];
          ret = r !== true ? 'no-play' : 'none';
        }
    }
  } else {
    if (msg.status === _reactNativeChatSdk.ChatMessageStatus.SUCCESS) {
      ret = 'send-success';
    } else if (msg.status === _reactNativeChatSdk.ChatMessageStatus.FAIL) {
      ret = 'send-fail';
    } else {
      ret = 'sending';
    }
    if (msg.chatType === _reactNativeChatSdk.ChatMessageChatType.PeerChat && msg.hasDeliverAck === true) {
      ret = 'send-to-peer';
    }
    if (msg.chatType === _reactNativeChatSdk.ChatMessageChatType.PeerChat && msg.hasReadAck === true) {
      ret = 'peer-read';
    }
  }
  return ret;
}
function getStateIcon(state) {
  let ret = 'loading';
  switch (state) {
    case 'loading-attachment':
      ret = 'loading';
      break;
    case 'send-success':
      ret = 'check';
      break;
    case 'send-fail':
      ret = 'exclamation_mark_in_circle';
      break;
    case 'send-to-peer':
      ret = 'check_2';
      break;
    case 'peer-read':
      ret = 'check_2';
      break;
    case 'sending':
      ret = 'loading';
      break;
    case 'no-play':
      ret = 'dot_1';
      break;
    case 'none':
      ret = 'loading';
      break;
    default:
      break;
  }
  return ret;
}
function getStateIconColor(state) {
  let ret = 'common';
  switch (state) {
    case 'loading-attachment':
      ret = 'common';
      break;
    case 'send-success':
      ret = 'common';
      break;
    case 'send-fail':
      ret = 'red';
      break;
    case 'send-to-peer':
      ret = 'common';
      break;
    case 'peer-read':
      ret = 'green';
      break;
    case 'sending':
      ret = 'common';
      break;
    case 'no-play':
      ret = 'red';
      break;
    case 'none':
      ret = 'common';
      break;
    default:
      break;
  }
  return ret;
}
async function getImageThumbUrl(msg) {
  const body = msg.body;
  // const tmp = '/Users/asterisk/Library/Developer/CoreSimulator/Devices/604D801A-1119-460B-8FA8-EB305EC1D5E8/data/Containers/Data/Application/9B034A2E-24F3-4233-8E7D-1FEF570F17CC/Library/Application Support/HyphenateSDK/appdata/zuoyu/zd2/thumb_b8b30d30-b466-11ee-b157-fb4184017b8e?em-redirect=true&share-secret=uLM0QLRmEe6iMvuXVj8Kki5KRZPAkp9oJpQiiLtDDEG-j8lH';
  // const tmp2 = encodeURIComponent(tmp);
  // return tmp2;
  // // return tmp;
  // return localUrlEscape(ImageUrl(tmp));
  // return 'file:///data/user/0/com.hyphenate.rn.ChatUikitExample/cache/rn_image_picker_lib_temp_8ecb3509-71d9-4574-8ada-4d92e6f947e6.jpg';
  let isExisted = await _services.Services.dcs.isExistedFile(body.thumbnailLocalPath);
  if (isExisted) {
    return _utils.LocalPath.showImage(body.thumbnailLocalPath);
  }
  isExisted = await _services.Services.dcs.isExistedFile(body.localPath);
  if (isExisted) {
    return _utils.LocalPath.showImage(body.localPath);
  }
  return body.thumbnailRemotePath;
}
async function getVideoThumbUrl(msg) {
  const body = msg.body;
  let isExisted = await _services.Services.dcs.isExistedFile(body.thumbnailLocalPath);
  if (isExisted) {
    return _utils.LocalPath.showImage(body.thumbnailLocalPath);
    // return localUrlEscape(ImageUrl(body.thumbnailLocalPath));
    // return `file://${body.thumbnailLocalPath}`;
  }

  return body.thumbnailRemotePath;
}
const hw = params => {
  const {
    height,
    width,
    maxWidth
  } = params;
  let ret;
  if (width / height >= 10) {
    const w = maxWidth;
    ret = {
      width: w,
      height: w * 0.1
    };
  } else if (width * 4 >= 3 * height) {
    const w = maxWidth;
    ret = {
      width: w,
      height: w * (height / width)
    };
  } else if (width * 10 >= 1 * height) {
    const h = maxWidth * 4 / 3;
    ret = {
      width: width / height * h,
      height: h
    };
  } else {
    // width / height < 1 / 10
    const h = maxWidth * 4 / 3;
    ret = {
      width: 0.1 * h,
      height: h
    };
  }
  return ret;
};
function getImageShowSize(msg, maxW) {
  const maxWidth = maxW ?? _reactNative.Dimensions.get('window').width * 0.6;
  const body = msg.body;
  const width = body.width;
  const height = body.height;
  if (width !== undefined && height !== undefined && width !== null && height !== null && width !== 0 && height !== 0) {
    return hw({
      width,
      height,
      maxWidth
    });
  } else {
    return {
      width: maxWidth,
      height: maxWidth
    };
  }
}
function getImageSizeFromUrl(url, onFinished) {
  _reactNative.Image.getSize(url, (width, height) => {
    console.log('dev:getImageSizeFromUrl', width, height);
    onFinished({
      isOk: true,
      width,
      height
    });
  }, error => {
    console.log('dev:getImageSizeFromUrl', url, error);
    onFinished({
      isOk: false
    });
  });
}
function getFileSize(size) {
  if (size === undefined) {
    return '0B';
  }
  if (size < 1024) {
    return `${size}B`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)}KB`;
  } else if (size < 1024 * 1024 * 1024) {
    return `${(size / 1024 / 1024).toFixed(1)}MB`;
  } else {
    return `${(size / 1024 / 1024 / 1024).toFixed(1)}GB`;
  }
}
function getMessageBubblePadding(msg) {
  if (msg.body.type === _reactNativeChatSdk.ChatMessageType.IMAGE) {
    return {
      paddingHorizontal: undefined,
      paddingVertical: undefined
    };
  } else if (msg.body.type === _reactNativeChatSdk.ChatMessageType.VIDEO) {
    return {
      paddingHorizontal: undefined,
      paddingVertical: undefined
    };
  } else if (msg.body.type === _reactNativeChatSdk.ChatMessageType.CUSTOM) {
    const body = msg.body;
    if (body.event === _chat.gCustomMessageCardEventType) {
      return {
        paddingHorizontal: undefined,
        paddingVertical: undefined
      };
    }
  } else if (msg.body.type === _reactNativeChatSdk.ChatMessageType.FILE) {
    return {
      paddingHorizontal: undefined,
      paddingVertical: undefined
    };
  }
  return {
    paddingHorizontal: 12,
    paddingVertical: 7
  };
}
function isQuoteMessage(msg, _msgQuote) {
  var _msg$attributes2;
  const quote = (_msg$attributes2 = msg.attributes) === null || _msg$attributes2 === void 0 ? void 0 : _msg$attributes2[_chat.gMessageAttributeQuote];
  return quote !== undefined;
}
function getQuoteAttribute(msg, _msgQuote) {
  var _msg$attributes3;
  const quoteAttributes = (_msg$attributes3 = msg.attributes) === null || _msg$attributes3 === void 0 ? void 0 : _msg$attributes3[_chat.gMessageAttributeQuote];
  return quoteAttributes;
}
function getSystemTip(msg, tr) {
  if (msg.body.type !== _reactNativeChatSdk.ChatMessageType.CUSTOM) {
    return '';
  }
  const body = msg.body;
  if (body.event === _chat.gCustomMessageRecallEventType) {
    try {
      var _body$params;
      const content = JSON.parse((_body$params = body.params) === null || _body$params === void 0 ? void 0 : _body$params.recall);
      return tr(content.text, content.self === content.from, content.fromName ?? content.from);
    } catch (error) {
      return tr('_uikit_msg_tip_recall');
    }
  } else if (body.event === _chat.gCustomMessageCreateGroupEventType) {
    try {
      var _body$params2;
      const content = JSON.parse((_body$params2 = body.params) === null || _body$params2 === void 0 ? void 0 : _body$params2.create_group);
      return tr(content.text, content.self);
    } catch (error) {
      return tr('_uikit_msg_tip_create_group_success');
    }
  }
  return '';
}
//# sourceMappingURL=MessageListItem.hooks.js.map